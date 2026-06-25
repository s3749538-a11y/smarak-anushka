'use client'

import { useState, useRef } from 'react'
import { Sparkles, Heart, HeartCrack, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PuzzleGate } from '@/components/ui/puzzle-gate'
import { generateVibeSummary } from '@/lib/api-client'
import type { Question, Response, VibeSummary } from '@/lib/types'

interface VibeRevealProps {
  questions: Question[]
  responses: Record<string, Response>
  analyzingRespondent: 'smarak' | 'anushka' // whose answers we're analyzing
  sectionTitle: string // e.g., "what i know about you" or "what anushka thinks about you"
  musicSrc?: string
}

export function VibeReveal({
  questions,
  responses,
  analyzingRespondent,
  sectionTitle,
  musicSrc,
}: VibeRevealProps) {
  const [gateOpen, setGateOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<VibeSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [muted, setMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Filter responses to only the ones from the person we're analyzing
  const relevantResponses = Object.values(responses).filter(
    (r) => r.respondent === analyzingRespondent
  )
  const answeredCount = relevantResponses.length

  const handleUnlock = async () => {
    setUnlocked(true)
    setGateOpen(false)
    await generateSummary()

    // Fade music in, muted by default
    if (musicSrc && audioRef.current) {
      audioRef.current.volume = 0.35
      audioRef.current.play().catch(() => {})
    }
  }

  const generateSummary = async () => {
    setLoading(true)
    setError(null)
    try {
      const answers = relevantResponses
        .map((r) => {
          const q = questions.find((q) => q.id === r.question_id)
          return q ? { question: q.text, answer: r.answer, category: q.category } : null
        })
        .filter((x): x is { question: string; answer: string; category: typeof questions[number]['category'] } => !!x)

      const result = await generateVibeSummary(answers)
      setSummary(result)
    } catch (err) {
      console.error(err)
      setError("couldn't generate this right now — give it another try?")
    } finally {
      setLoading(false)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const next = !muted
    setMuted(next)
    audioRef.current.muted = next
    if (!next) audioRef.current.play().catch(() => {})
  }

  if (answeredCount === 0) return null

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="container mx-auto px-4 max-w-2xl">
        {!unlocked ? (
          <div className="text-center py-8">
            <Sparkles className="w-6 h-6 text-gold-500 mx-auto mb-3" />
            <h3 className="font-display text-h3 text-ink-900 mb-2">
              {analyzingRespondent === 'anushka'
                ? "want to know what anushka's answers say about her?"
                : 'want to know what your answers say about you?'}
            </h3>
            <p className="text-sm text-ink-400 mb-6">one quick question to unlock it</p>
            <button
              onClick={() => setGateOpen(true)}
              className="inline-block px-6 py-3 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
            >
              show me
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <h3 className="font-display text-h3 text-ink-900">{sectionTitle}</h3>
              </div>
              {musicSrc && (
                <button
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute music' : 'Mute music'}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-100 text-ink-500 hover:text-pink-600 hover:border-pink-300 transition-colors"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-ink-400">
                <Loader2 className="w-6 h-6 animate-spin mb-3" />
                <p className="text-sm">reading through everything they said...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-body text-ink-400 mb-4">{error}</p>
                <Button onClick={generateSummary} withParticles>
                  try again
                </Button>
              </div>
            )}

            {!loading && !error && summary && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-gold-50 p-6 sm:p-7 shadow-sm">
                  <h4 className="font-display text-h3 text-ink-900 mb-2">the vibe</h4>
                  <p className="text-body text-ink-700 leading-relaxed">{summary.vibe}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-pink-100 bg-white p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                      <h4 className="font-medium text-ink-700">likes</h4>
                    </div>
                    <ul className="space-y-2">
                      {summary.likes.map((item, i) => (
                        <li key={i} className="text-sm text-ink-600 flex items-start gap-2">
                          <span className="text-pink-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-ink-100 bg-white p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <HeartCrack className="w-4 h-4 text-ink-400" />
                      <h4 className="font-medium text-ink-700">dislikes</h4>
                    </div>
                    <ul className="space-y-2">
                      {summary.dislikes.map((item, i) => (
                        <li key={i} className="text-sm text-ink-600 flex items-start gap-2">
                          <span className="text-ink-300 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {musicSrc && (
              <audio ref={audioRef} src={musicSrc} loop muted={muted} className="hidden" />
            )}
          </div>
        )}
      </div>

      <PuzzleGate isOpen={gateOpen} onSuccess={handleUnlock} />
    </section>
  )
}
