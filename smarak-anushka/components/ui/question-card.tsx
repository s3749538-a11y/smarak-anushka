'use client'

import { Check } from 'lucide-react'
import type { Question } from '@/lib/types'
import { CATEGORY_LABELS, CATEGORY_STYLES, CATEGORY_EMOJI } from '@/lib/constants'
import { cn } from '@/lib/utils'

const ACCENT_BAR: Record<string, string> = {
  fun: 'bg-amber-400',
  flirty: 'bg-blue-400',
  deep: 'bg-purple-400',
}

interface QuestionCardProps {
  question: Question
  isSelected: boolean
  hasAnswer: boolean
  onSelect: () => void
}

export function QuestionCard({ question, isSelected, hasAnswer, onSelect }: QuestionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative w-full text-left overflow-hidden rounded-2xl border bg-white p-4 pl-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
        isSelected ? 'border-pink-400 shadow-md ring-1 ring-pink-100' : 'border-ink-100'
      )}
    >
      <span
        className={cn(
          'absolute left-0 top-0 h-full w-1.5 transition-all duration-200 group-hover:w-2',
          ACCENT_BAR[question.category]
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <p className="text-body text-ink-700 leading-snug">
          <span className="mr-1.5">{CATEGORY_EMOJI[question.category]}</span>
          {question.text}
        </p>
        {hasAnswer && (
          <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span
          className={cn(
            'inline-flex rounded-full px-3 py-1 text-sm font-medium',
            CATEGORY_STYLES[question.category]
          )}
        >
          {CATEGORY_LABELS[question.category]}
        </span>
        <span className="text-sm text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity">
          tap to open →
        </span>
      </div>
    </button>
  )
}
