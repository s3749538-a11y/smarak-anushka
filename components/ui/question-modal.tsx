'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  CATEGORY_LABELS,
  CATEGORY_EMOJI,
  CATEGORY_STYLES,
  CATEGORY_GLOW,
  ANSWER_REACTIONS,
} from '@/lib/constants'
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
  const [reaction, setReaction] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [writingOwn, setWritingOwn] = useState(false)

  const isChoiceQuestion = !!question?.options && question.options.length > 0

  useEffect(() => {
    setAnswer(initialAnswer)
    setReaction(null)
    setError(null)
    // If she's revisiting a question and her saved answer isn't one of the
    // listed options, default straight to the text view so it's not lost.
    setWritingOwn(
      isChoiceQuestion && !!initialAnswer && !question?.options?.includes(initialAnswer)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAnswer, question?.id])

  if (!question) return null

  const randomReaction = () => {
    const pool = ANSWER_REACTIONS[question.category]
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const finishSubmit = async (value: string) => {
    if (!value.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(value)
      setReaction(randomReaction())
      setTimeout(() => {
        setReaction(null)
        onOpenChange(false)
      }, 1400)
    } catch {
      setError('something went wrong. try again?')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePickOption = (opt: string) => {
    setAnswer(opt)
    finishSubmit(opt)
  }

  const handleTextSubmit = () => finishSubmit(answer)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex min-h-full items-center justify-center p-4">
                  <Dialog.Content asChild forceMount onClick={(e) => e.stopPropagation()}>
                    <motion.div
                      className="w-full max-w-lg"
                      initial={{ opacity: 0, scale: 0.92, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    >
                      <div
                        className={`relative rounded-3xl border border-ink-100 bg-white shadow-2xl bg-gradient-to-br ${CATEGORY_GLOW[question.category]}`}
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

                          <AnimatePresence mode="wait">
                            {reaction ? (
                              <motion.div
                                key="reaction"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="py-8 text-center"
                              >
                                <p className="font-display italic text-h3 text-pink-600">{reaction}</p>
                              </motion.div>
                            ) : isChoiceQuestion && !writingOwn ? (
                              <motion.div key="choices" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="flex flex-col gap-2 mb-4">
                                  {question.options!.map((opt, i) => (
                                    <button
                                      key={i}
                                      onClick={() => handlePickOption(opt)}
                                      disabled={submitting}
                                      className={`w-full text-left rounded-xl border px-4 py-3 text-body font-medium transition-all duration-150 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50/60 ${
                                        answer === opt
                                          ? 'border-pink-400 bg-pink-50 text-pink-700'
                                          : 'border-ink-100 bg-ink-50/40 text-ink-700'
                                      } disabled:opacity-60 disabled:hover:translate-y-0`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  onClick={() => setWritingOwn(true)}
                                  className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-pink-600 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  type your own instead
                                </button>
                              </motion.div>
                            ) : (
                              <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Textarea
                                  placeholder="be real with me..."
                                  value={answer}
                                  onChange={(e) => setAnswer(e.target.value)}
                                  className="min-h-28"
                                  maxLength={2000}
                                  autoFocus
                                />

                                {error && <p className="text-sm text-amber-600 mt-2">{error}</p>}

                                <div className="flex items-center gap-3 mt-4">
                                  <Button
                                    onClick={handleTextSubmit}
                                    disabled={!answer.trim() || submitting}
                                    withParticles
                                    className="flex-1"
                                  >
                                    {submitting ? 'sending...' : 'send it 🚀'}
                                  </Button>
                                  {isChoiceQuestion && (
                                    <button
                                      onClick={() => {
                                        setWritingOwn(false)
                                        setAnswer('')
                                      }}
                                      className="text-sm text-ink-400 hover:text-pink-600 transition-colors whitespace-nowrap"
                                    >
                                      ← back to choices
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
