import type { Question, Response, VibeSummary } from './types'

export async function getQuestions(): Promise<Question[]> {
  const res = await fetch('/api/questions')
  if (!res.ok) throw new Error('Failed to fetch questions')
  return res.json()
}

export async function getResponses(): Promise<Response[]> {
  const res = await fetch('/api/responses')
  if (!res.ok) throw new Error('Failed to fetch responses')
  return res.json()
}

export async function submitResponse(questionId: string, answer: string, respondent: 'smarak' | 'anushka' = 'anushka'): Promise<Response> {
  const res = await fetch('/api/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question_id: questionId, answer, respondent }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to submit response')
  }
  return res.json()
}

export async function generateVibeSummary(
  answers: { question: string; answer: string; category: string }[]
): Promise<VibeSummary> {
  const res = await fetch('/api/vibe-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to generate summary')
  }
  return res.json()
}
