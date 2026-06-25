'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/navbar'
import { Landing } from '@/components/sections/Landing'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Collage } from '@/components/sections/Collage'
import { InterestsProjects } from '@/components/sections/InterestsProjects'
import { FunFacts } from '@/components/sections/FunFacts'
import { DiscoveryZone } from '@/components/sections/DiscoveryZone'
import { VibeReveal } from '@/components/sections/VibeReveal'
import { Footer } from '@/components/sections/Footer'
import { FloatingNote } from '@/components/ui/floating-note'
import { useAuth } from '@/lib/use-auth'
import { FLOATING_NOTES } from '@/lib/constants'
import type { Question, Response } from '@/lib/types'

export default function Home() {
  const { identity, ready, login } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<string, Response>>({})

  // Wait for localStorage check before deciding whether to show Landing,
  // so returning visitors don't see a flash of the splash screen.
  if (!ready) return null

  const entered = identity !== null

  return (
    <>
      {!entered && <Landing onEnter={login} />}
      <main className={entered ? 'animate-fade-in-up' : 'invisible'}>
        <Navbar />
        <Hero />
        <FloatingNote text={FLOATING_NOTES[0]} side="right" />
        <About />
        <FloatingNote text={FLOATING_NOTES[1]} side="left" />
        <Collage />
        <FloatingNote text={FLOATING_NOTES[2]} side="right" />
        <InterestsProjects />
        <FloatingNote text={FLOATING_NOTES[3]} side="left" />
        <FunFacts />
        <FloatingNote text={FLOATING_NOTES[4]} side="right" />
        <DiscoveryZone
          identity={identity ?? 'anushka'}
          onDataChange={(q, r) => {
            setQuestions(q)
            setResponses(r)
          }}
        />
        {/* Each person sees a vibe summary of the OTHER person's answers,
            not their own — that's the whole point of the reveal. */}
        {identity === 'smarak' && (
          <VibeReveal
            questions={questions}
            responses={responses}
            analyzingRespondent="anushka"
            sectionTitle="what i know about you"
            musicSrc="/audio/reveal-song.mp3"
          />
        )}
        {identity === 'anushka' && (
          <VibeReveal
            questions={questions}
            responses={responses}
            analyzingRespondent="smarak"
            sectionTitle="what smarak thinks about you"
            musicSrc="/audio/reveal-song-her.mp3"
          />
        )}
        <FloatingNote text={FLOATING_NOTES[9]} side="left" />
        <Footer />
      </main>
    </>
  )
}
