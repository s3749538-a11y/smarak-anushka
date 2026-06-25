'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Set your own personal question + answer here — something only she'd
// know off the top of her head, harder to brute-force than a shared code.
const PUZZLE_QUESTION = 'what book am i reading right now?'
const PUZZLE_ANSWER = 'king of gluttony' // matched case-insensitively, trimmed

interface PuzzleGateProps {
  isOpen: boolean
  onSuccess: () => void
}

export function PuzzleGate({ isOpen, onSuccess }: PuzzleGateProps) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setError(null)

    const normalized = answer.toLowerCase().trim()
    const correct = normalized.includes(PUZZLE_ANSWER) || normalized === PUZZLE_ANSWER

    if (correct) {
      setAnswer('')
      setSubmitted(false)
      onSuccess()
    } else {
      setError("hmm, not quite 👀 think again?")
      setTimeout(() => setSubmitted(false), 500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitted) handleSubmit()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      style={{ zIndex: 99999 }}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 shadow-2xl"
        style={{ zIndex: 100000, position: 'relative' }}
      >
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100">
            <HelpCircle className="w-6 h-6 text-pink-600" />
          </div>
        </div>

        <h2 className="font-display text-h3 text-ink-900 text-center mb-2">
          one quick question
        </h2>
        <p className="text-sm text-ink-600 text-center mb-6 capitalize">
          {PUZZLE_QUESTION}
        </p>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="your answer..."
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setError(null)
            }}
            onKeyDown={handleKeyDown}
            disabled={submitted}
            autoFocus
            className={cn(
              'w-full rounded-xl border bg-white px-4 py-3 text-body text-ink-700 placeholder:text-ink-400 outline-none transition-colors',
              error ? 'border-red-300 focus:border-red-400' : 'border-ink-100 focus:border-pink-400'
            )}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || submitted}
            withParticles
            className="w-full"
          >
            {submitted ? 'checking...' : 'unlock'}
          </Button>
        </div>

        <p className="text-xs text-ink-300 text-center mt-5">you know this one 😏</p>
      </div>
    </div>
  )
}
