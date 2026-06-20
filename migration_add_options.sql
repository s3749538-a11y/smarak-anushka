-- Run this INSTEAD of supabase_schema.sql if you already ran the old
-- schema and have data you don't want to lose. Safe to run multiple times.

-- 1. Add the new column (no-op if it already exists)
alter table questions add column if not exists options jsonb default '[]'::jsonb;

-- 2. Backfill options for existing questions, and add the two new ones
--    (F1/football question + renumber). Match is by question text.
update questions set options = '["WWE, obviously \ud83d\udcaa", "K-drama, don''t @ me \ud83d\ude2d", "Both, why are we fighting"]'::jsonb where text = 'WWE or K-drama?';
update questions set options = '["Anything with cheese \ud83e\uddc0", "Maggi at 2am \ud83c\udf5c", "Whatever mom''s cooking"]'::jsonb where text = 'What''s your go-to comfort food?';
update questions set options = '["Cats, no debate \ud83d\udc31", "Dogs, ride or die \ud83d\udc36", "Neither, I''m a plant person \ud83c\udf31"]'::jsonb where text = 'Cats or dogs?';
update questions set options = '["drivers license, obviously \ud83d\ude97", "good 4 u, chaos era \ud83d\udd25", "vampire, full drama mode 🩸"]'::jsonb where text = 'If you could be in any Olivia Rodrigo music video, which one?';
update questions set options = '["Late night drive + bad music \ud83d\ude97\ud83c\udfb6", "Something low-key, just talking for hours \u2615", "Surprise me, I like chaos \ud83d\ude0f"]'::jsonb where text = 'What''s your ideal first date with someone you actually like?';
update questions set options = '["Their smile, every time \ud83d\ude0a", "How they treat people around them", "Vibes honestly, can''t explain it"]'::jsonb where text = 'What do you notice first when you meet someone?';
update questions set options = '["Unexpected compliments \ud83d\ude48", "Someone remembering small things about me", "I don''t blush, I intimidate \ud83d\ude0e"]'::jsonb where text = 'What makes you blush? (be honest)';
update questions set options = '["Send a dumb meme rn \ud83d\ude02", "Just text \"thinking of you\"", "Show up with food, ngl \ud83c\udf6b"]'::jsonb where text = 'If I could do ONE thing that would make you smile right now, what would it be?';
update questions set options = '["Grows over time, slow burn \ud83c\udf31", "First sight is real, fight me \ud83d\udc40", "Jury''s still out, ask me later"]'::jsonb where text = 'Do you believe in love at first sight, or does it grow over time?';
update questions set options = '["That I kept going even on bad days \ud83c\udf19", "How much I''ve grown this year", "Honestly still figuring that out"]'::jsonb where text = 'What are you genuinely proud of about yourself?';
update questions set options = '["It''s a long story...", "Maybe one day, not today \ud83d\udc40", "You''ll have to earn that one \ud83d\ude0f"]'::jsonb where text = 'What''s something you''ve never told anyone, but kinda want to?';
update questions set options = '["Settled, doing work I actually love", "Still figuring it out, and that''s okay", "Honestly hoping it includes good people around me"]'::jsonb where text = 'Where do you see yourself in 5 years? (career, life, relationships)';
update questions set options = '["Honesty, even when it''s inconvenient", "Someone who actually listens", "Effort — showing up, not just saying things"]'::jsonb where text = 'What''s the most important quality in someone you''d want to be close to?';
update questions set options = '["I''d overthink less, fr", "Be more patient with myself", "Nothing, I''m a work in progress and that''s fine"]'::jsonb where text = 'If you could change one thing about yourself, what would it be?';
update questions set options = '["10/10, you carry me \ud83c\udfae", "7/10, you''re kinda competitive ngl", "Honestly I just like the company \ud83d\ude0c"]'::jsonb where text = 'on a scale of 1-10, how much do you actually enjoy gaming with me?';
update questions set options = '["You remembered something I mentioned once \ud83e\udd79", "You checked in without me asking", "Still thinking of one, give me a sec \ud83d\ude0f"]'::jsonb where text = 'what''s one small thing i''ve done that made you feel like i actually pay attention?';
update questions set options = '["Cooking my favorite dish \ud83c\udf73", "A language I like", "Honestly the guitar was already a lot, slow down \ud83d\ude02"]'::jsonb where text = 'if i could learn one more thing just for you, what would it be?';
update questions set options = '["Excited to see, no pressure \ud83c\udf19", "Taking it slow, but hopeful", "Ask me again after this site impresses me more \ud83d\ude0f"]'::jsonb where text = 'what''s your honest take on where this could go?';

-- 3. Insert the new F1/football question (only if it's not already there)
insert into questions (text, category, order_index, options)
select 'F1 or football — and don''t say "both" to dodge the question 👀', 'fun', 5,
       '["F1, Hamilton or nothing \ud83c\udfce\ufe0f", "Football, CR7 forever \u26bd", "Honestly couldn''t care less \ud83d\ude05"]'::jsonb
where not exists (
  select 1 from questions where text = 'F1 or football — and don''t say "both" to dodge the question 👀'
);
