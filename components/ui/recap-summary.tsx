'use client'

import { Sparkles } from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_EMOJI } from '@/lib/constants'
import type { Question, Response, QuestionCategory } from '@/lib/types'

interface RecapSummaryProps {
  questions: Question[]
  responses: Record<string, Response>
}

const CATEGORY_ORDER: QuestionCategory[] = ['fun', 'flirty', 'deep', 'curiosity']

export function RecapSummary({ questions, responses }: RecapSummaryProps) {
  const questionById = new Map(questions.map((q) => [q.id, q]))
  const answered = Object.values(responses)

  // Category breakdown — how many of each type she actually opened.
  const counts: Record<QuestionCategory, number> = { fun: 0, flirty: 0, deep: 0, curiosity: 0 }
  answered.forEach((r) => {
    const q = questionById.get(r.question_id)
    if (q) counts[q.category]++
  })

  // Highlights: prioritize free-text answers (questions with no options) —
  // those are where she actually wrote something in her own words, which
  // carries more signal now that most fun/flirty questions are quick
  // multiple-choice picks. Falls back to deep/curiosity picks if there
  // aren't enough free-text answers yet.
  const withQuestion = answered
    .map((r) => ({ response: r, question: questionById.get(r.question_id) }))
    .filter((x): x is { response: Response; question: Question } => !!x.question)

  const weighted = [...withQuestion].sort((a, b) => {
    const isFreeText = (x: typeof a) => !x.question.options || x.question.options.length === 0
    const aWeight = isFreeText(a) ? 2 : a.question.category !== 'fun' ? 1 : 0
    const bWeight = isFreeText(b) ? 2 : b.question.category !== 'fun' ? 1 : 0
    if (aWeight !== bWeight) return bWeight - aWeight
    return b.response.answer.length - a.response.answer.length
  })

  const highlights = weighted.slice(0, 2)

  return (
    <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-gold-50 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-gold-500" />
        <h3 className="font-display text-h3 text-ink-900">what i&apos;ve learned about you</h3>
      </div>
      <p className="text-sm text-ink-400 mb-6">based on what you&apos;ve told me so far</p>

      {/* Category stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {CATEGORY_ORDER.map((cat) => (
          <div
            key={cat}
            className="flex flex-col items-center justify-center rounded-2xl bg-white/70 border border-pink-100/70 py-4"
          >
            <span className="text-2xl mb-1">{CATEGORY_EMOJI[cat]}</span>
            <span className="font-display text-h3 text-pink-600">{counts[cat]}</span>
            <span className="text-xs sm:text-sm text-ink-400">{CATEGORY_LABELS[cat]}</span>
          </div>
        ))}
      </div>

      {/* Highlight answers */}
      {highlights.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink-600">a couple of my favorites 🥹</p>
          {highlights.map(({ response, question }) => (
            <div
              key={response.id}
              className="rounded-2xl bg-white border border-pink-100 p-4"
            >
              <p className="text-sm text-ink-400 mb-1.5">
                {CATEGORY_EMOJI[question.category]} {question.text}
              </p>
              <p className="text-body text-ink-700 leading-relaxed">&ldquo;{response.answer}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
