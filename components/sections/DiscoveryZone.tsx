'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/loading-skeleton'
import { QuestionCard } from '@/components/ui/question-card'
import { QuestionModal } from '@/components/ui/question-modal'
import { ResponseDisplay } from '@/components/ui/response-display'
import { ContainerScroll } from '@/components/ui/container-scroll'
import { RecapSummary } from '@/components/ui/recap-summary'
import { PuzzleGate } from '@/components/ui/puzzle-gate'
import { getQuestions, getResponses, submitResponse } from '@/lib/api-client'
import { DISCOVERY_COPY } from '@/lib/constants'
import type { Question, Response } from '@/lib/types'

// "Most" of the questions answered — recap appears once the other person
// has cleared this share of the bank, rather than requiring every single one.
const RECAP_THRESHOLD = 0.8

interface DiscoveryZoneProps {
  identity: 'smarak' | 'anushka'
  onDataChange?: (questions: Question[], allResponses: Record<string, Response>) => void
}

export function DiscoveryZone({ identity, onDataChange }: DiscoveryZoneProps) {
  const other: 'smarak' | 'anushka' = identity === 'smarak' ? 'anushka' : 'smarak'

  const [questions, setQuestions] = useState<Question[]>([])
  // Keyed by `${question_id}:${respondent}` so both people's answers to the
  // same question can coexist without overwriting each other.
  const [allResponses, setAllResponses] = useState<Record<string, Response>>({})
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const keyFor = (questionId: string, respondent: string) => `${questionId}:${respondent}`

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [questionsData, responsesData] = await Promise.all([getQuestions(), getResponses()])
        setQuestions(questionsData)
        const responseMap = responsesData.reduce((acc: Record<string, Response>, r) => {
          acc[keyFor(r.question_id, r.respondent)] = r
          return acc
        }, {})
        setAllResponses(responseMap)
        onDataChange?.(questionsData, responseMap)
      } catch (err) {
        console.error(err)
        setLoadError("couldn't load questions. try refreshing?")
      } finally {
        setLoading(false)
      }
    }
    load()
    // onDataChange intentionally omitted — this should only run once on
    // mount, not re-fire if the parent passes a new inline callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (q: Question) => {
    setSelectedQuestion(q)
    setModalOpen(true)
  }

  const handleSubmit = async (answer: string) => {
    if (!selectedQuestion) return
    const newResponse = await submitResponse(selectedQuestion.id, answer, identity)
    setAllResponses((prev) => {
      const next = { ...prev, [keyFor(selectedQuestion.id, identity)]: newResponse }
      onDataChange?.(questions, next)
      return next
    })
  }

  // My own answers — used to show "answered" state on question cards and
  // to prefill the modal when re-opening a question I've already done.
  const myResponses: Record<string, Response> = {}
  // The other person's answers — what gets locked behind the puzzle gate.
  const theirResponses: Record<string, Response> = {}
  Object.values(allResponses).forEach((r) => {
    if (r.respondent === identity) myResponses[r.question_id] = r
    else theirResponses[r.question_id] = r
  })

  const theirAnsweredList = Object.values(theirResponses).sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  )

  const showRecap =
    questions.length > 0 && theirAnsweredList.length / questions.length >= RECAP_THRESHOLD

  const otherLabel = other === 'anushka' ? 'anushka' : 'smarak'

  return (
    <section
      id="discovery"
      className="py-12 md:py-16 bg-gradient-to-b from-white via-pink-50/50 to-white"
    >
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="font-display text-h2 text-ink-900 italic mb-3">
              {DISCOVERY_COPY.heading}
            </h2>
            <p className="text-body text-ink-600">{DISCOVERY_COPY.subheading}</p>
          </>
        }
      >
        <div className="p-5 sm:p-8 bg-white">
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : loadError && questions.length === 0 ? (
            <p className="text-body text-ink-400 text-center py-12">{loadError}</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
              {questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  isSelected={selectedQuestion?.id === q.id}
                  hasAnswer={!!myResponses[q.id]}
                  onSelect={() => handleSelect(q)}
                />
              ))}
            </div>
          )}
        </div>
      </ContainerScroll>

      {showRecap && (
        <div className="container mx-auto px-4 max-w-2xl mt-8">
          {!authenticated ? (
            <div className="text-center py-8">
              <p className="text-body text-ink-600 mb-4">
                {otherLabel} has answered enough questions for you to see the recap 👀
              </p>
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-block px-6 py-3 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
              >
                unlock recap
              </button>
            </div>
          ) : (
            <RecapSummary questions={questions} responses={theirResponses} />
          )}
        </div>
      )}

      {theirAnsweredList.length > 0 && (
        <div className="container mx-auto px-4 max-w-3xl mt-8">
          <h3 className="text-h3 text-ink-700 mb-5 text-center">
            {authenticated ? `what ${otherLabel} told you` : `${otherLabel}'s answers (locked)`}
          </h3>
          {!authenticated ? (
            <div className="text-center py-8">
              <p className="text-body text-ink-400 mb-4">
                unlock the recap to see {otherLabel}&apos;s answers
              </p>
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-block px-6 py-3 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
              >
                unlock answers
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {theirAnsweredList.map((resp) => (
                <ResponseDisplay key={resp.id} response={resp} />
              ))}
            </div>
          )}
        </div>
      )}

      <PuzzleGate isOpen={authOpen} onSuccess={() => {
        setAuthOpen(false)
        setAuthenticated(true)
      }} />

      <QuestionModal
        question={selectedQuestion}
        initialAnswer={selectedQuestion ? myResponses[selectedQuestion.id]?.answer : ''}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
