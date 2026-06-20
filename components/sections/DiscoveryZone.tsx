'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/loading-skeleton'
import { QuestionCard } from '@/components/ui/question-card'
import { QuestionModal } from '@/components/ui/question-modal'
import { ResponseDisplay } from '@/components/ui/response-display'
import { ContainerScroll } from '@/components/ui/container-scroll'
import { RecapSummary } from '@/components/ui/recap-summary'
import { getQuestions, getResponses, submitResponse } from '@/lib/api-client'
import { DISCOVERY_COPY } from '@/lib/constants'
import type { Question, Response } from '@/lib/types'

// "Most" of the questions answered — recap appears once she's cleared this
// share of the bank, rather than requiring literally every single one.
const RECAP_THRESHOLD = 0.8

export function DiscoveryZone() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<string, Response>>({})
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [questionsData, responsesData] = await Promise.all([getQuestions(), getResponses()])
        setQuestions(questionsData)
        const responseMap = responsesData.reduce((acc: Record<string, Response>, r) => {
          acc[r.question_id] = r
          return acc
        }, {})
        setResponses(responseMap)
      } catch (err) {
        console.error(err)
        setLoadError("couldn't load questions. try refreshing?")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSelect = (q: Question) => {
    setSelectedQuestion(q)
    setModalOpen(true)
  }

  const handleSubmit = async (answer: string) => {
    if (!selectedQuestion) return
    const newResponse = await submitResponse(selectedQuestion.id, answer)
    setResponses((prev) => ({ ...prev, [selectedQuestion.id]: newResponse }))
  }

  const answeredList = Object.values(responses).sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  )

  const showRecap =
    questions.length > 0 && answeredList.length / questions.length >= RECAP_THRESHOLD

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
                  hasAnswer={!!responses[q.id]}
                  onSelect={() => handleSelect(q)}
                />
              ))}
            </div>
          )}
        </div>
      </ContainerScroll>

      {showRecap && (
        <div className="container mx-auto px-4 max-w-2xl mt-8">
          <RecapSummary questions={questions} responses={responses} />
        </div>
      )}

      {answeredList.length > 0 && (
        <div className="container mx-auto px-4 max-w-3xl mt-8">
          <h3 className="text-h3 text-ink-700 mb-5 text-center">what you&apos;ve told me so far</h3>
          <div className="space-y-3">
            {answeredList.map((resp) => (
              <ResponseDisplay key={resp.id} response={resp} />
            ))}
          </div>
        </div>
      )}

      <QuestionModal
        question={selectedQuestion}
        initialAnswer={selectedQuestion ? responses[selectedQuestion.id]?.answer : ''}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
