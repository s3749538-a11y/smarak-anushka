'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORY_LABELS, CATEGORY_EMOJI, CATEGORY_STYLES, CATEGORY_GLOW } from '@/lib/constants'
import type { Question } from '@/lib/types'

interface QuestionModalProps {
  question: Question | null
  initialAnswer?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (answer: string) => Promise<void>
}

export function QuestionModal({
  question,
  initialAnswer = '',
  open,
  onOpenChange,
  onSubmit,
}: QuestionModalProps) {
  const [answer, setAnswer] = useState(initialAnswer)
  const [submitting, setSubmitting] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAnswer(initialAnswer)
    setJustSaved(false)
    setError(null)
  }, [initialAnswer, question?.id])

  if (!question) return null

  const handlePickOption = (opt: string) => {
    setAnswer(opt)
  }

  const handleSubmit = async () => {
    if (!answer.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(answer)
      setJustSaved(true)
      setTimeout(() => {
        setJustSaved(false)
        onOpenChange(false)
      }, 1100)
    } catch {
      setError('something went wrong. try again?')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-2xl bg-gradient-to-br ${CATEGORY_GLOW[question.category]}`}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${CATEGORY_STYLES[question.category]}`}
                      >
                        <span>{CATEGORY_EMOJI[question.category]}</span>
                        {CATEGORY_LABELS[question.category]}
                      </span>
                      <Dialog.Close asChild>
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <Dialog.Title className="font-display text-h3 sm:text-h2 text-ink-900 leading-snug mb-6">
                      {question.text}
                    </Dialog.Title>

                    {question.options && question.options.length > 0 && (
                      <div className="mb-5">
                        <p className="text-sm text-ink-400 mb-2.5">
                          tap one for a laugh, or just write your own below 👇
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {question.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handlePickOption(opt)}
                              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 ${
                                answer === opt
                                  ? 'border-pink-400 bg-pink-50 text-pink-700'
                                  : 'border-ink-100 bg-ink-50/60 text-ink-600 hover:border-pink-300'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Textarea
                      placeholder="or type your real answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-28"
                      maxLength={2000}
                      autoFocus
                    />

                    {error && <p className="text-sm text-amber-600 mt-2">{error}</p>}

                    <div className="flex gap-2 mt-5">
                      <Button
                        onClick={handleSubmit}
                        disabled={!answer.trim() || submitting}
                        withParticles
                        className="flex-1"
                      >
                        {submitting ? 'sending...' : justSaved ? 'sent ✓' : 'send it 🚀'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
