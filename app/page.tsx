'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/navbar'
import { Landing } from '@/components/sections/Landing'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Collage } from '@/components/sections/Collage'
import { InterestsProjects } from '@/components/sections/InterestsProjects'
import { DiscoveryZone } from '@/components/sections/DiscoveryZone'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      {!entered && <Landing onEnter={() => setEntered(true)} />}
      <main className={entered ? 'animate-fade-in-up' : 'invisible'}>
        <Navbar />
        <Hero />
        <About />
        <Collage />
        <InterestsProjects />
        <DiscoveryZone />
        <Footer />
      </main>
    </>
  )
}
