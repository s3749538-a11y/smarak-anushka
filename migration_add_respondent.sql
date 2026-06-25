-- Add respondent column to responses table to track whose answers these are.
-- 'smarak' = your answers about her
-- 'anushka' = her answers about herself
-- Default to 'anushka' for existing/future rows since she's the primary answerer.

ALTER TABLE responses
ADD COLUMN respondent text DEFAULT 'anushka',
ADD CONSTRAINT check_respondent CHECK (respondent IN ('smarak', 'anushka'));

-- Index on respondent so vibe summaries can efficiently pull only one person's answers
CREATE INDEX IF NOT EXISTS idx_responses_respondent ON responses(respondent);
