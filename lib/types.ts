export type QuestionCategory = 'fun' | 'flirty' | 'deep' | 'curiosity'

export interface Question {
  id: string
  text: string
  category: QuestionCategory
  order_index: number
  options?: string[]
  created_at?: string
}

export interface Response {
  id: string
  question_id: string
  answer: string
  respondent: 'smarak' | 'anushka'
  submitted_at: string
  updated_at?: string
}

export interface ApiError {
  error: string
}

export interface VibeSummary {
  vibe: string
  likes: string[]
  dislikes: string[]
}
