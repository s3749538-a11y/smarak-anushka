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
  subheadline: 'i make playlists that somehow fit every mood, remember weird little details, and will absolutely send you a picture of the sunset because it reminded me of you.',
  subheadlineNote: "not trying to convince you i'm interesting. if you stick around, you'll probably decide that yourself.",
  body: [
    '19 | bhubaneswar | believes good conversations should never have a time limit',
    "(this website is basically my excuse to say hi.)",
  ],
  ctaPrimary: "let's start",
  ctaSecondary: 'ask me something random',
}

export const ABOUT_COPY = {
  heading: 'who i actually am',
  paragraphs: [
    "i'm the kind of person who notices little things. when someone tells me their favorite snack once, i remember it. when a song reminds me of someone, i save it instead of sending it immediately.",
    "i'll probably remember how you take your coffee before i remember your birthday.",
    "i like quiet cafés, long walks that weren't planned, laughing at terrible jokes, and conversations where neither of us notices it's already 2am.",
    "i'm competitive during sports, dramatic while watching F1, and surprisingly patient when teaching someone something. (also: 19, from bhubaneswar, studying data science — but that's the boring part.)",
    "i believe effort is attractive. showing up is attractive. being kind when nobody's watching is attractive.",
    "and if you're reading this... thanks for making it this far.",
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
  { label: 'sunset enjoyer', emoji: '🌅' },
  { label: 'playlist curator', emoji: '🎧' },
  { label: 'random wikipedia rabbit holes', emoji: '📚' },
  { label: 'midnight food enthusiast', emoji: '🍜' },
  { label: 'badminton', emoji: '🏸' },
  { label: 'cricket', emoji: '🏏' },
  { label: 'learning guitar', emoji: '🎸' },
  { label: 'movie nights', emoji: '🎬' },
  { label: 'rainy weather', emoji: '🌧️' },
  { label: 'taking pictures i never post', emoji: '📸' },
  { label: 'making gifts', emoji: '🎁' },
  { label: 'soft hoodies', emoji: '🧸' },
  { label: 'spontaneous plans', emoji: '✈️' },
  { label: 'Olivia Rodrigo', emoji: '🎤' },
  { label: 'K-dramas', emoji: '📺' },
  { label: 'F1 — Team Lewis Hamilton', emoji: '🏎️' },
  { label: 'Football — Ronaldo for life', emoji: '⚽' },
]

export const LITTLE_THINGS_HEADING = 'little things that make me, me'

export const LITTLE_THINGS = [
  { emoji: '☕', text: 'Coffee tastes better after 9 PM.' },
  { emoji: '🎵', text: "If I send you a song, I'm secretly hoping you'll think of me whenever it plays." },
  { emoji: '🎁', text: 'Handmade gifts > expensive gifts.' },
  { emoji: '📸', text: 'I take random photos of skies. No idea why. I just like remembering days.' },
  { emoji: '🏸', text: "I'll probably challenge you to badminton. You'll probably win. I'll ask for a rematch anyway." },
  { emoji: '🍟', text: "I will steal exactly one fry. It's tradition." },
]

export const FUN_FACTS_HEADING = "things you'll eventually find out anyway"

export const FUN_FACTS = [
  { title: 'I text back fast.', body: "Unless I'm asleep. Or deciding which emoji looks less awkward." },
  { title: 'I laugh too much.', body: 'Even at my own jokes. Especially at my own jokes.' },
  { title: "I can't hear one good song.", body: 'It immediately becomes a three-day obsession.' },
  { title: 'I overthink texts.', body: 'Then send them anyway.' },
  { title: 'If I care about you...', body: "you'll never have to wonder." },
]

// Playful little notes that surface as she scrolls deeper into the site —
// rewards for sticking around, not a hard CTA every time.
export const FLOATING_NOTES = [
  "you're still here? that's kinda cute.",
  'this is where most people stop scrolling.',
  "i'm starting to think you're actually interested.",
  "okay... now i'm curious about you.",
  "you've officially unlocked the unnecessary facts section.",
  "you're making this website feel appreciated.",
  "careful. i'm going to assume you like me.",
  'this scroll is getting suspicious.',
  "you've reached the part where i'm rooting for you.",
  'thanks for staying.',
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
  curiosity: 'curiosity',
}

export const CATEGORY_EMOJI: Record<QuestionCategory, string> = {
  fun: '🎉',
  flirty: '😏',
  deep: '🌙',
  curiosity: '👀',
}

export const CATEGORY_STYLES: Record<QuestionCategory, string> = {
  fun: 'bg-amber-50 text-amber-600 border border-amber-100',
  flirty: 'bg-blue-50 text-blue-600 border border-blue-100',
  deep: 'bg-purple-50 text-purple-600 border border-purple-100',
  curiosity: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
}

export const CATEGORY_GLOW: Record<QuestionCategory, string> = {
  fun: 'from-amber-100/60 via-transparent to-transparent',
  flirty: 'from-blue-100/60 via-transparent to-transparent',
  deep: 'from-purple-100/60 via-transparent to-transparent',
  curiosity: 'from-emerald-100/60 via-transparent to-transparent',
}

// Tiny reactions shown right after she picks a multiple-choice answer —
// randomized per category so it feels alive rather than scripted per-option.
export const ANSWER_REACTIONS: Record<QuestionCategory, string[]> = {
  fun: [
    "You're answering these awfully fast...",
    'Interesting choice.',
    "I would've guessed something else.",
    "You're making this website worth building.",
  ],
  flirty: [
    'Noted. I\u2019ll remember that.',
    'Okay... that\u2019s cute.',
    'Green flag.',
    "That answer tells me more than you think.",
  ],
  deep: [
    'I promise I\u2019m not judging... much.',
    'That was either incredibly honest or incredibly strategic.',
    "Okay... now I'm curious about you.",
  ],
  curiosity: [
    "You're dangerously easy to talk to.",
    'You just unlocked three more questions.',
    "Okay... now I'm curious about you.",
  ],
}

// Question bank — used as the source of truth for the seed SQL, and as a
// fallback if Supabase isn't configured yet.
// `options`, when present, ARE the real answer choices (not just inspo) —
// tapping one submits that exact text as her answer. Questions with no
// `options` are free-text only. Either way, a "type your own instead"
// fallback is always available in the modal.
export const SEED_QUESTIONS: {
  text: string
  category: QuestionCategory
  order_index: number
  options?: string[]
}[] = [
  // 🎉 Fun
  {
    text: "If we're hanging out, what's the first thing we're doing?",
    category: 'fun',
    order_index: 1,
    options: ['☕ Finding a cute café', '🏸 Something competitive', '🎮 Gaming', '🚗 Driving with music on'],
  },
  {
    text: 'Which green flag makes you instantly smile?',
    category: 'fun',
    order_index: 2,
    options: ['Someone remembers little things', 'Good sense of humor', 'Effort without being asked', 'Kind to everyone'],
  },
  {
    text: 'Be honest... how long would you survive my playlist?',
    category: 'fun',
    order_index: 3,
    options: ['One song', '30 minutes', 'Give me the aux', "I'd steal it"],
  },
  {
    text: "What's the most attractive hobby?",
    category: 'fun',
    order_index: 4,
    options: ['🎸 Guitar', '📚 Reading', '🏃 Gym', '🎨 Making things'],
  },
  {
    text: "What's your love language?",
    category: 'fun',
    order_index: 5,
    options: ['Time', 'Acts of service', 'Physical affection', 'Words', 'Gifts'],
  },
  {
    text: 'Pick one.',
    category: 'fun',
    order_index: 6,
    options: ['Sunrise', 'Sunset', 'Rain', 'Night drives'],
  },
  {
    text: 'Your toxic gaming trait?',
    category: 'fun',
    order_index: 7,
    options: ['I blame lag', 'I get too competitive', 'I carry everyone', 'I rage quit'],
  },
  {
    text: 'Which date sounds best?',
    category: 'fun',
    order_index: 8,
    options: ['Mini golf', 'Bookstore', 'Arcade', 'Cooking together'],
  },
  {
    text: 'Would you rather...',
    category: 'fun',
    order_index: 9,
    options: ['Receive flowers', 'Receive playlists', 'Receive handwritten letters', 'Receive surprise food'],
  },
  {
    text: "What's harder?",
    category: 'fun',
    order_index: 10,
    options: ['Starting a conversation', 'Ending one', 'Saying goodbye', 'Admitting feelings'],
  },

  // 😊 Flirty
  {
    text: 'If I stole one fry...',
    category: 'flirty',
    order_index: 11,
    options: [
      "We're fighting",
      'You can have it',
      'Only one?',
      "I'll steal yours too",
    ],
  },
  {
    text: 'If I remembered your coffee order after hearing it once...',
    category: 'flirty',
    order_index: 12,
    options: ['Green flag', "That's adorable", 'Slightly concerning 😂', 'Marry me (joking... maybe)'],
  },
  {
    text: 'What would make you blush fastest?',
    category: 'flirty',
    order_index: 13,
    options: ['Eye contact', 'Genuine compliments', 'Being teased', 'Unexpected kindness'],
  },
  {
    text: 'If I sent you a song...',
    category: 'flirty',
    order_index: 14,
    options: ["I'd listen immediately", "I'd read the lyrics first", "I'd ask why this song", "I'd send one back"],
  },
  {
    text: "What's more attractive?",
    category: 'flirty',
    order_index: 15,
    options: ['Confidence', 'Kindness', 'Humor', 'Emotional intelligence'],
  },
  {
    text: 'If we were watching a movie...',
    category: 'flirty',
    order_index: 16,
    options: ['Holding hands', 'Talking through the movie', 'Stealing snacks', 'Falling asleep halfway'],
  },
  {
    text: 'You get one compliment. What are you choosing?',
    category: 'flirty',
    order_index: 17,
    options: ["\"You're cute.\"", "\"I'm proud of you.\"", '"I feel safe with you."', '"You make life lighter."'],
  },
  {
    text: 'Would you rather someone...',
    category: 'flirty',
    order_index: 18,
    options: ['Remember small details', 'Plan cute surprises', 'Make you laugh constantly', 'Be your biggest supporter'],
  },
  {
    text: "What's the biggest green flag?",
    category: 'flirty',
    order_index: 19,
    options: ['They keep their promises', 'They listen', 'They make time', 'They communicate'],
  },
  {
    text: 'If I randomly said "I have something for you." Your first thought?',
    category: 'flirty',
    order_index: 20,
    options: ['Food', 'Flowers', 'Handmade gift', 'Playlist'],
  },

  // 🌙 Deep
  {
    text: "What's something people misunderstand about you?",
    category: 'deep',
    order_index: 21,
  },
  {
    text: "What's one thing you wish people noticed more?",
    category: 'deep',
    order_index: 22,
    options: ['My effort', 'My humor', 'My kindness', 'The little things I do'],
  },
  {
    text: 'Which scares you more?',
    category: 'deep',
    order_index: 23,
    options: ['Being misunderstood', 'Losing someone', 'Never trying', 'Regret'],
  },
  {
    text: "What's harder for you?",
    category: 'deep',
    order_index: 24,
    options: ['Saying sorry', 'Saying "I miss you."', 'Saying "I need help."', 'Saying goodbye'],
  },
  {
    text: 'When do you feel most like yourself?',
    category: 'deep',
    order_index: 25,
    options: ['Alone', 'Around close friends', 'With family', 'Around someone I trust'],
  },
  {
    text: "What's something that instantly makes someone unforgettable?",
    category: 'deep',
    order_index: 26,
    options: ['Their laugh', 'Their kindness', 'Their curiosity', 'The way they make people feel'],
  },
  {
    text: 'Which matters more?',
    category: 'deep',
    order_index: 27,
    options: ['Chemistry', 'Timing', 'Effort', 'Communication'],
  },
  {
    text: "Finish the sentence: \"I'll know I've found my person when...\"",
    category: 'deep',
    order_index: 28,
  },
  {
    text: "What's your biggest green flag?",
    category: 'deep',
    order_index: 29,
  },

  // 👀 Curiosity
  {
    text: "What's one question you've always wanted to ask me?",
    category: 'curiosity',
    order_index: 30,
  },
  {
    text: 'What do you think my biggest red flag is?',
    category: 'curiosity',
    order_index: 31,
  },
  {
    text: 'Guess something about me.',
    category: 'curiosity',
    order_index: 32,
  },
  {
    text: 'What section of this website surprised you the most?',
    category: 'curiosity',
    order_index: 33,
    options: ['The writing', 'The questions', 'The playlists', 'Still deciding'],
  },
  {
    text: 'If you could change ONE thing about this website...',
    category: 'curiosity',
    order_index: 34,
  },
  {
    text: 'Be honest. Would you go on a first date with me based only on this website?',
    category: 'curiosity',
    order_index: 35,
    options: ['Absolutely', 'Probably', 'Maybe', 'I need more convincing 😌'],
  },
  {
    text: "What's one thing you're now curious to know about me?",
    category: 'curiosity',
    order_index: 36,
  },
]
