# smarak + anushka 💫

A two-way discovery site. Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## What's here

- **Landing splash screen** — an interactive "scratch ink" reveal (canvas-based, works with mouse drag or touch swipe) that uncovers what the site actually is before you enter. Has a quiet "skip →" link in the corner for anyone who'd rather not scratch.
- **Hero, About, Interests/Projects, Discovery Zone, Footer** — all the sections from the build guide, fully wired up.
- **Interests section** now includes F1 (Lewis Hamilton) and Football (Ronaldo), each with an emoji, plus a stack of three layered "flirty line" cards tucked into the section — hovering any one fans all three out so they're all visible and clickable, instead of overlapping.
- **"A bit of both worlds"** — a hover-interactive fan-deck of photos between About and Interests, mixing your real photos with two interest visuals (F1, football).
- **Discovery Zone** is the main feature: question cards now sit inside a 3D scroll-tilt container (tilts and settles as you scroll past it) and clicking one pops up a modal — category emoji, the question, a few playful hypothetical "starter" answers as tappable chips (purely for fun/inspo), and a real textarea underneath for her actual answer. Answering updates a recap list below.
- **Recap summary** — once she's answered ~80% or more of the questions, a "what I've learned about you" card appears above the answer list: a category breakdown (fun/flirty/deep counts) plus her two most thoughtful answers (longest flirty/deep responses), framed as your highlights.
- **Theme**: pink (rose) as the primary brand color, warm gold as a secondary accent — see `tailwind.config.ts` for the full `pink`/`gold` scales. The `deep` question category moved from teal to a muted purple so it doesn't compete with the pink brand color used for selection states.
- Buttons across the site (CTA, "send it") have an optional **particle burst** effect on click (`withParticles` prop) for a bit of satisfying feedback.
- API routes (`/api/questions`, `/api/responses`) use the Supabase **service role key** server-side — the browser never sees it.

## Setup (local)

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local with your Supabase project's keys (see below)
npm run dev
# visit http://localhost:3000
```

## Supabase setup (5 minutes)

**First time setting this up?**
1. Go to [supabase.com](https://supabase.com) → New Project.
2. Once created, open **SQL Editor** → New Query → paste the contents of `supabase_schema.sql` from this repo → Run.
   This creates the `questions` and `responses` tables and seeds all 19 questions (including the new F1/football one), each with its `options` (the hypothetical starter answers shown in the modal).
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (under "Project API keys", click to reveal) → `SUPABASE_SERVICE_ROLE_KEY`
4. Paste all three into `.env.local`.

**Already ran an older version of this schema?**
Run `migration_add_options.sql` instead — it adds the `options` column and backfills it without touching your existing data, and adds the new F1/football question if it's missing.

**Never commit `.env.local` or expose the service role key client-side** — it bypasses Row Level Security.

## Adding your photos

Drop your images into:
```
public/images/hero.jpg
public/images/moments/moment1.jpg   through   moment12.jpg   (the About carousel)
public/images/collage/f1.jpg        (F1 / Lewis Hamilton — stock image is fine)
public/images/collage/football.jpg  (football / Ronaldo — stock image is fine)
```

The **About carousel** now cycles through up to 12 photos (`moment1.jpg`–`moment12.jpg`) instead of just 4 — add as many or as few as you have. **You don't need all 12** — the carousel automatically skips any slot that doesn't have a matching file, so it works fine with just 4 photos or with all 12, no code changes needed either way.

The **Collage section** ("a bit of both worlds") reuses `moment1`–`moment4` alongside the two stock images — same files, just keep at least those four in place if you want that section populated.

Same filenames as referenced in `components/sections/Hero.tsx`, `components/sections/About.tsx`, and `lib/constants.ts` (`COLLAGE_CARDS`) — swap the files and you're done.

Use real photos of yourself for everything except `f1.jpg`/`football.jpg`, not AI-generated ones — the whole site's pitch is "honest," and that only works if the photos are actually you.

## Customizing copy & questions

Everything text-related lives in `lib/constants.ts`:
- `LANDING_COPY` — the splash screen's eyebrow, headline, and the message hidden under the ink
- `HERO_COPY`, `ABOUT_COPY`, `FOOTER_COPY` — main site copy
- `INTERESTS` — list of `{ label, emoji }` objects shown as badges
- `FLIRTY_LINES` — the three one-liners in the stacked cards
- `SEED_QUESTIONS` — the question bank, each with optional `options` (hypothetical chips shown in the modal)

For copy, edit `lib/constants.ts`. To change *live* questions after deploy, edit directly in the Supabase table editor (or re-run a modified version of the schema SQL).

Your Instagram/GitHub links: update `SITE_CONFIG` in `lib/constants.ts`.

## Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/smarak-anushka
git push -u origin main
```

Then on [vercel.com](https://vercel.com):
1. Import the repo.
2. Add the same three env vars from `.env.local` under **Settings → Environment Variables**.
3. Deploy. Done in ~2 minutes.

## Tech notes

- Fonts: **Fraunces** (display, italic for headlines) + **Inter** (body) — loaded via `next/font/google`, no extra requests.
- Colors map directly to the brief's palette (teal `#1D9E75`, blue `#378ADD`, amber `#BA7517`) — see `tailwind.config.ts`.
- The ink-reveal landing screen is a self-contained canvas component (`components/ui/ink-reveal.tsx`) — `permanent` mode bakes scratched areas onto an offscreen canvas so they stay revealed instead of fading back.
- The question grid sits inside `components/ui/container-scroll.tsx`, a Framer Motion scroll-linked 3D tilt container.
- Accessibility: visible focus rings, `prefers-reduced-motion` respected, alt text on all images, keyboard-operable modal (Radix Dialog), and a no-scratch-required skip link on the landing screen.
- The API upserts responses (one answer per question, editable) rather than allowing duplicate rows per question.

