import type { QuestionCategory } from './types'

export const SITE_CONFIG = {
  name: 'smarak',
  for: 'anushka',
  instagramHandle: 'https://instagram.com/', // TODO: add your handle
  githubHandle: 'https://github.com/', // TODO: add your handle
}

// --- Landing / splash screen (InkReveal) ---
export const LANDING_COPY = {
  eyebrow: 'a website. for one person.',
  headline: "this isn't a portfolio.",
  subheadline: "it's me, trying to get to know you properly.",
  body: "scratch the surface to find out what this actually is →",
  revealText: [
    'hi anushka. 👋',
    'this is a two-way thing — i ask you stuff, you answer honestly, no overthinking it.',
    'fun questions, flirty ones, a few deep ones too. your call which ones you open.',
    "built it myself because texting felt too easy to ignore. this isn't.",
  ],
  cta: "okay, let's go",
}

export const HERO_COPY = {
  headline: "hey, i'm smarak.",
  subheadline: 'learned guitar for you. made websites for you.',
  subheadlineNote: '(okay, maybe this site is mostly for impressing you)',
  body: [
    '19 | bhubaneswar | code90 is my current obsession',
    "i'm the kind of person who remembers small things about you and finds reasons to make you smile.",
    "into coding, sports, music, and probably too much overthinking. but mostly i'm here because you're worth the effort.",
  ],
  ctaPrimary: "let's start",
  ctaSecondary: 'ask me anything',
}

export const ABOUT_COPY = {
  heading: 'who i actually am',
  paragraphs: [
    "i'm 19, from bhubaneswar, currently studying data science at iter. sounds boring, but i'm genuinely obsessed with building things. right now, i'm doing code90 — 90 days of deep learning in dsa and ml. the goal? understand how things actually work, not just code them.",
    "sports have always been my escape. cricket, badminton, basketball — if there's a court or field, you'll find me there sweating. it's where i think clearly, where stress just disappears.",
    "but here's the thing that's different now: i picked up guitar. not because i had to. because someone made me want to learn. and that someone... might be reading this right now.",
    "i'm the kind of person who notices small things. the way you laugh. what makes you tick. what makes you comfortable. i remember, and i use that. i make handmade gifts, plan surprises, and genuinely care about effort over flashiness. call it overthinking, i call it attention to detail.",
  ],
}

export const COLLAGE_CARDS = [
  { imgUrl: '/images/moments/moment1.jpg', alt: 'Smarak playing sports', label: 'me, mid-game 🏏' },
  { imgUrl: '/images/collage/f1.jpg', alt: 'Formula 1 car', label: 'F1 — Hamilton 🏎️' },
  { imgUrl: '/images/moments/moment3.jpg', alt: 'Smarak with guitar', label: 'guitar, learned for you 🎸' },
  { imgUrl: '/images/hero.jpg', alt: 'Smarak', label: 'just me' },
  { imgUrl: '/images/collage/football.jpg', alt: 'Football', label: 'football — Ronaldo ⚽' },
  { imgUrl: '/images/moments/moment2.jpg', alt: 'Smarak coding', label: 'me, deep in code90 💻' },
  { imgUrl: '/images/moments/moment4.jpg', alt: 'Smarak laughing', label: 'me, just laughing' },
]

export const FLIRTY_LINES = [
  { text: "you scrolling this far already says something 👀", emoji: '😏' },
  { text: "yes, i made a website. no, i'm not normal about you.", emoji: '🫠' },
  { text: "still here? good. that's exactly what i was hoping for.", emoji: '✨' },
]

export const INTERESTS = [
  { label: 'Data Structures & Algorithms', emoji: '🧠' },
  { label: 'Machine Learning', emoji: '🤖' },
  { label: 'Web Development', emoji: '💻' },
  { label: 'Cricket', emoji: '🏏' },
  { label: 'Basketball', emoji: '🏀' },
  { label: 'Badminton', emoji: '🏸' },
  { label: 'Gym & Fitness', emoji: '💪' },
  { label: 'Guitar', emoji: '🎸' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'DIY Crafts', emoji: '✂️' },
  { label: 'Olivia Rodrigo', emoji: '🎤' },
  { label: 'K-dramas', emoji: '📺' },
  { label: 'F1 — Team Lewis Hamilton', emoji: '🏎️' },
  { label: 'Football — Ronaldo for life', emoji: '⚽' },
]

export const PROJECTS = [
  {
    title: 'Code90',
    description:
      'Building deep understanding of Data Structures, Machine Learning, and web fundamentals. Started June 18, 2026.',
    status: 'In Progress',
  },
  {
    title: 'This Website',
    description:
      "A two-way discovery tool. Because asking questions is better than guessing. Also, subtle flex.",
    status: "You're looking at it right now",
  },
  {
    title: 'Custom DIY Crafts',
    description: 'Personalized gifts for people I care about. No mass production, only thought.',
    status: 'Ongoing',
  },
]

export const DISCOVERY_COPY = {
  heading: "let's actually know each other ✨",
  subheading: 'i ask you questions. you answer honestly. no games, just real talk.',
  emptyState: 'pick a question to get started →',
  placeholder: 'be real with me...',
}

export const FOOTER_COPY = {
  text: "that's me. now your turn?",
  subtext: "pick a question. be real. we'll figure out the rest from there.",
}

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  fun: 'fun',
  flirty: 'flirty',
  deep: 'deep',
}

export const CATEGORY_EMOJI: Record<QuestionCategory, string> = {
  fun: '🎉',
  flirty: '😏',
  deep: '🌙',
}

export const CATEGORY_STYLES: Record<QuestionCategory, string> = {
  fun: 'bg-amber-50 text-amber-600 border border-amber-100',
  flirty: 'bg-blue-50 text-blue-600 border border-blue-100',
  deep: 'bg-purple-50 text-purple-600 border border-purple-100',
}

export const CATEGORY_GLOW: Record<QuestionCategory, string> = {
  fun: 'from-amber-100/60 via-transparent to-transparent',
  flirty: 'from-blue-100/60 via-transparent to-transparent',
  deep: 'from-purple-100/60 via-transparent to-transparent',
}

// Fallback question bank — used only if Supabase isn't configured yet,
// or as the source of truth for the seed SQL.
// `options` are lighthearted, hypothetical "starter" answers shown in the
// pop-up modal — purely for fun/inspo, never auto-submitted as her real answer.
export const SEED_QUESTIONS: {
  text: string
  category: QuestionCategory
  order_index: number
  options?: string[]
}[] = [
  {
    text: 'WWE or K-drama?',
    category: 'fun',
    order_index: 1,
    options: ['WWE, obviously 💪', 'K-drama, don\u2019t @ me 😭', 'Both, why are we fighting'],
  },
  {
    text: "What's your go-to comfort food?",
    category: 'fun',
    order_index: 2,
    options: ['Anything with cheese 🧀', 'Maggi at 2am 🍜', 'Whatever mom\u2019s cooking'],
  },
  {
    text: 'Cats or dogs?',
    category: 'fun',
    order_index: 3,
    options: ['Cats, no debate 🐱', 'Dogs, ride or die 🐶', 'Neither, I\u2019m a plant person 🌱'],
  },
  {
    text: 'If you could be in any Olivia Rodrigo music video, which one?',
    category: 'fun',
    order_index: 4,
    options: ['drivers license, obviously 🚗', 'good 4 u, chaos era 🔥', 'vampire, full drama mode 🩸'],
  },
  {
    text: 'F1 or football — and don\u2019t say "both" to dodge the question 👀',
    category: 'fun',
    order_index: 5,
    options: ['F1, Hamilton or nothing 🏎️', 'Football, CR7 forever ⚽', 'Honestly couldn\u2019t care less 😅'],
  },
  {
    text: "What's your ideal first date with someone you actually like?",
    category: 'flirty',
    order_index: 6,
    options: ['Late night drive + bad music 🚗🎶', 'Something low-key, just talking for hours ☕', 'Surprise me, I like chaos 😏'],
  },
  {
    text: 'What do you notice first when you meet someone?',
    category: 'flirty',
    order_index: 7,
    options: ['Their smile, every time 😊', 'How they treat people around them', 'Vibes honestly, can\u2019t explain it'],
  },
  {
    text: 'What makes you blush? (be honest)',
    category: 'flirty',
    order_index: 8,
    options: ['Unexpected compliments 🙈', 'Someone remembering small things about me', 'I don\u2019t blush, I intimidate 😎'],
  },
  {
    text: 'If I could do ONE thing that would make you smile right now, what would it be?',
    category: 'flirty',
    order_index: 9,
    options: ['Send a dumb meme rn 😂', 'Just text "thinking of you"', 'Show up with food, ngl 🍫'],
  },
  {
    text: 'Do you believe in love at first sight, or does it grow over time?',
    category: 'flirty',
    order_index: 10,
    options: ['Grows over time, slow burn 🌱', 'First sight is real, fight me 👀', 'Jury\u2019s still out, ask me later'],
  },
  {
    text: 'What are you genuinely proud of about yourself?',
    category: 'deep',
    order_index: 11,
    options: ['That I kept going even on bad days 🌙', 'How much I\u2019ve grown this year', 'Honestly still figuring that out'],
  },
  {
    text: "What's something you've never told anyone, but kinda want to?",
    category: 'deep',
    order_index: 12,
    options: ['It\u2019s a long story...', 'Maybe one day, not today 👀', 'You\u2019ll have to earn that one 😏'],
  },
  {
    text: 'Where do you see yourself in 5 years? (career, life, relationships)',
    category: 'deep',
    order_index: 13,
    options: ['Settled, doing work I actually love', 'Still figuring it out, and that\u2019s okay', 'Honestly hoping it includes good people around me'],
  },
  {
    text: "What's the most important quality in someone you'd want to be close to?",
    category: 'deep',
    order_index: 14,
    options: ['Honesty, even when it\u2019s inconvenient', 'Someone who actually listens', 'Effort — showing up, not just saying things'],
  },
  {
    text: 'If you could change one thing about yourself, what would it be?',
    category: 'deep',
    order_index: 15,
    options: ['I\u2019d overthink less, fr', 'Be more patient with myself', 'Nothing, I\u2019m a work in progress and that\u2019s fine'],
  },
  {
    text: 'on a scale of 1-10, how much do you actually enjoy gaming with me?',
    category: 'fun',
    order_index: 16,
    options: ['10/10, you carry me 🎮', '7/10, you\u2019re kinda competitive ngl', 'Honestly I just like the company 😌'],
  },
  {
    text: 'what\u2019s one small thing i\u2019ve done that made you feel like i actually pay attention?',
    category: 'flirty',
    order_index: 17,
    options: ['You remembered something I mentioned once 🥹', 'You checked in without me asking', 'Still thinking of one, give me a sec 😏'],
  },
  {
    text: 'if i could learn one more thing just for you, what would it be?',
    category: 'flirty',
    order_index: 18,
    options: ['Cooking my favorite dish 🍳', 'A language I like', 'Honestly the guitar was already a lot, slow down 😂'],
  },
  {
    text: "what's your honest take on where this could go?",
    category: 'deep',
    order_index: 19,
    options: ['Excited to see, no pressure 🌙', 'Taking it slow, but hopeful', 'Ask me again after this site impresses me more 😏'],
  },
]
