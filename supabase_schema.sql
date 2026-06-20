-- Run this in your Supabase project's SQL editor.
-- Project dashboard -> SQL Editor -> New Query -> paste this -> Run.
-- NOTE: if you already ran an older version of this schema, run
-- migration_add_options.sql instead (it adds the new column without
-- dropping your existing tables/responses).

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  category text not null check (category in ('fun', 'flirty', 'deep')),
  order_index int not null,
  options jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions(id) on delete cascade,
  answer text not null,
  submitted_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_responses_question_id on responses(question_id);
create index if not exists idx_responses_submitted_at on responses(submitted_at desc);

-- Seed questions (matches lib/constants.ts SEED_QUESTIONS)
insert into questions (text, category, order_index, options) values
('WWE or K-drama?', 'fun', 1, '["WWE, obviously \ud83d\udcaa", "K-drama, don''t @ me \ud83d\ude2d", "Both, why are we fighting"]'),
('What''s your go-to comfort food?', 'fun', 2, '["Anything with cheese \ud83e\uddc0", "Maggi at 2am \ud83c\udf5c", "Whatever mom''s cooking"]'),
('Cats or dogs?', 'fun', 3, '["Cats, no debate \ud83d\udc31", "Dogs, ride or die \ud83d\udc36", "Neither, I''m a plant person \ud83c\udf31"]'),
('If you could be in any Olivia Rodrigo music video, which one?', 'fun', 4, '["drivers license, obviously \ud83d\ude97", "good 4 u, chaos era \ud83d\udd25", "vampire, full drama mode 🩸"]'),
('F1 or football — and don''t say "both" to dodge the question 👀', 'fun', 5, '["F1, Hamilton or nothing \ud83c\udfce\ufe0f", "Football, CR7 forever \u26bd", "Honestly couldn''t care less \ud83d\ude05"]'),
('What''s your ideal first date with someone you actually like?', 'flirty', 6, '["Late night drive + bad music \ud83d\ude97\ud83c\udfb6", "Something low-key, just talking for hours \u2615", "Surprise me, I like chaos \ud83d\ude0f"]'),
('What do you notice first when you meet someone?', 'flirty', 7, '["Their smile, every time \ud83d\ude0a", "How they treat people around them", "Vibes honestly, can''t explain it"]'),
('What makes you blush? (be honest)', 'flirty', 8, '["Unexpected compliments \ud83d\ude48", "Someone remembering small things about me", "I don''t blush, I intimidate \ud83d\ude0e"]'),
('If I could do ONE thing that would make you smile right now, what would it be?', 'flirty', 9, '["Send a dumb meme rn \ud83d\ude02", "Just text \"thinking of you\"", "Show up with food, ngl \ud83c\udf6b"]'),
('Do you believe in love at first sight, or does it grow over time?', 'flirty', 10, '["Grows over time, slow burn \ud83c\udf31", "First sight is real, fight me \ud83d\udc40", "Jury''s still out, ask me later"]'),
('What are you genuinely proud of about yourself?', 'deep', 11, '["That I kept going even on bad days \ud83c\udf19", "How much I''ve grown this year", "Honestly still figuring that out"]'),
('What''s something you''ve never told anyone, but kinda want to?', 'deep', 12, '["It''s a long story...", "Maybe one day, not today \ud83d\udc40", "You''ll have to earn that one \ud83d\ude0f"]'),
('Where do you see yourself in 5 years? (career, life, relationships)', 'deep', 13, '["Settled, doing work I actually love", "Still figuring it out, and that''s okay", "Honestly hoping it includes good people around me"]'),
('What''s the most important quality in someone you''d want to be close to?', 'deep', 14, '["Honesty, even when it''s inconvenient", "Someone who actually listens", "Effort — showing up, not just saying things"]'),
('If you could change one thing about yourself, what would it be?', 'deep', 15, '["I''d overthink less, fr", "Be more patient with myself", "Nothing, I''m a work in progress and that''s fine"]'),
('on a scale of 1-10, how much do you actually enjoy gaming with me?', 'fun', 16, '["10/10, you carry me \ud83c\udfae", "7/10, you''re kinda competitive ngl", "Honestly I just like the company \ud83d\ude0c"]'),
('what''s one small thing i''ve done that made you feel like i actually pay attention?', 'flirty', 17, '["You remembered something I mentioned once \ud83e\udd79", "You checked in without me asking", "Still thinking of one, give me a sec \ud83d\ude0f"]'),
('if i could learn one more thing just for you, what would it be?', 'flirty', 18, '["Cooking my favorite dish \ud83c\udf73", "A language I like", "Honestly the guitar was already a lot, slow down \ud83d\ude02"]'),
('what''s your honest take on where this could go?', 'deep', 19, '["Excited to see, no pressure \ud83c\udf19", "Taking it slow, but hopeful", "Ask me again after this site impresses me more \ud83d\ude0f"]');

-- Row Level Security: this site is a single shared link, not a multi-user app,
-- so we keep RLS simple — public read on questions, public read+write on responses.
-- All writes actually go through the API routes using the service-role key,
-- so RLS here is a safety net, not the primary gate.
alter table questions enable row level security;
alter table responses enable row level security;

create policy "Public can read questions" on questions
  for select using (true);

create policy "Public can read responses" on responses
  for select using (true);
