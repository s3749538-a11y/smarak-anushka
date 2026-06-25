-- Run this in your Supabase project's SQL editor if you already have the
-- site deployed and want to switch to the new question bank (real
-- multiple-choice answers, new "curiosity" category, completely new set
-- of questions replacing the old one).
--
-- WARNING: this clears all existing questions AND responses, since the
-- old questions no longer exist after this runs (responses reference
-- question_id via foreign key, so they'd be orphaned otherwise). If you
-- want to keep old answers, export them first.

-- 1. Widen the category constraint to allow the new 'curiosity' category.
alter table questions drop constraint if exists questions_category_check;
alter table questions add constraint questions_category_check
  check (category in ('fun', 'flirty', 'deep', 'curiosity'));

-- 2. Clear old responses first (foreign key), then old questions.
delete from responses;
delete from questions;

-- 3. Insert the new question bank.
insert into questions (text, category, order_index, options) values
('If we''re hanging out, what''s the first thing we''re doing?', 'fun', 1, '["☕ Finding a cute café","🏸 Something competitive","🎮 Gaming","🚗 Driving with music on"]'::jsonb),
('Which green flag makes you instantly smile?', 'fun', 2, '["Someone remembers little things","Good sense of humor","Effort without being asked","Kind to everyone"]'::jsonb),
('Be honest... how long would you survive my playlist?', 'fun', 3, '["One song","30 minutes","Give me the aux","I''d steal it"]'::jsonb),
('What''s the most attractive hobby?', 'fun', 4, '["🎸 Guitar","📚 Reading","🏃 Gym","🎨 Making things"]'::jsonb),
('What''s your love language?', 'fun', 5, '["Time","Acts of service","Physical affection","Words","Gifts"]'::jsonb),
('Pick one.', 'fun', 6, '["Sunrise","Sunset","Rain","Night drives"]'::jsonb),
('Your toxic gaming trait?', 'fun', 7, '["I blame lag","I get too competitive","I carry everyone","I rage quit"]'::jsonb),
('Which date sounds best?', 'fun', 8, '["Mini golf","Bookstore","Arcade","Cooking together"]'::jsonb),
('Would you rather...', 'fun', 9, '["Receive flowers","Receive playlists","Receive handwritten letters","Receive surprise food"]'::jsonb),
('What''s harder?', 'fun', 10, '["Starting a conversation","Ending one","Saying goodbye","Admitting feelings"]'::jsonb),
('If I stole one fry...', 'flirty', 11, '["We''re fighting","You can have it","Only one?","I''ll steal yours too"]'::jsonb),
('If I remembered your coffee order after hearing it once...', 'flirty', 12, '["Green flag","That''s adorable","Slightly concerning 😂","Marry me (joking... maybe)"]'::jsonb),
('What would make you blush fastest?', 'flirty', 13, '["Eye contact","Genuine compliments","Being teased","Unexpected kindness"]'::jsonb),
('If I sent you a song...', 'flirty', 14, '["I''d listen immediately","I''d read the lyrics first","I''d ask why this song","I''d send one back"]'::jsonb),
('What''s more attractive?', 'flirty', 15, '["Confidence","Kindness","Humor","Emotional intelligence"]'::jsonb),
('If we were watching a movie...', 'flirty', 16, '["Holding hands","Talking through the movie","Stealing snacks","Falling asleep halfway"]'::jsonb),
('You get one compliment. What are you choosing?', 'flirty', 17, '["\"You''re cute.\"","\"I''m proud of you.\"","\"I feel safe with you.\"","\"You make life lighter.\""]'::jsonb),
('Would you rather someone...', 'flirty', 18, '["Remember small details","Plan cute surprises","Make you laugh constantly","Be your biggest supporter"]'::jsonb),
('What''s the biggest green flag?', 'flirty', 19, '["They keep their promises","They listen","They make time","They communicate"]'::jsonb),
('If I randomly said "I have something for you." Your first thought?', 'flirty', 20, '["Food","Flowers","Handmade gift","Playlist"]'::jsonb),
('What''s something people misunderstand about you?', 'deep', 21, '[]'::jsonb),
('What''s one thing you wish people noticed more?', 'deep', 22, '["My effort","My humor","My kindness","The little things I do"]'::jsonb),
('Which scares you more?', 'deep', 23, '["Being misunderstood","Losing someone","Never trying","Regret"]'::jsonb),
('What''s harder for you?', 'deep', 24, '["Saying sorry","Saying \"I miss you.\"","Saying \"I need help.\"","Saying goodbye"]'::jsonb),
('When do you feel most like yourself?', 'deep', 25, '["Alone","Around close friends","With family","Around someone I trust"]'::jsonb),
('What''s something that instantly makes someone unforgettable?', 'deep', 26, '["Their laugh","Their kindness","Their curiosity","The way they make people feel"]'::jsonb),
('Which matters more?', 'deep', 27, '["Chemistry","Timing","Effort","Communication"]'::jsonb),
('Finish the sentence: "I''ll know I''ve found my person when..."', 'deep', 28, '[]'::jsonb),
('What''s your biggest green flag?', 'deep', 29, '[]'::jsonb),
('What''s one question you''ve always wanted to ask me?', 'curiosity', 30, '[]'::jsonb),
('What do you think my biggest red flag is?', 'curiosity', 31, '[]'::jsonb),
('Guess something about me.', 'curiosity', 32, '[]'::jsonb),
('What section of this website surprised you the most?', 'curiosity', 33, '["The writing","The questions","The playlists","Still deciding"]'::jsonb),
('If you could change ONE thing about this website...', 'curiosity', 34, '[]'::jsonb),
('Be honest. Would you go on a first date with me based only on this website?', 'curiosity', 35, '["Absolutely","Probably","Maybe","I need more convincing 😌"]'::jsonb),
('What''s one thing you''re now curious to know about me?', 'curiosity', 36, '[]'::jsonb);
