'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HERO_COPY } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="order-2 md:order-1 animate-fade-in-left">
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5]">
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-gold-400/80" aria-hidden="true" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-ink-50 shadow-sm ring-1 ring-gold-100">
                <Image
                  src="/images/hero.jpg"
                  alt="Smarak"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2 animate-fade-in-right text-center md:text-left">
            <h1 className="font-display text-h1 text-ink-900 italic">{HERO_COPY.headline}</h1>
            <p className="mt-3 text-h3 text-ink-700">{HERO_COPY.subheadline}</p>
            <p className="mt-1 text-body text-ink-400">{HERO_COPY.subheadlineNote}</p>

            <div className="mt-6 space-y-3">
              {HERO_COPY.body.map((line, i) => (
                <p key={i} className="text-body text-ink-600 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {HERO_COPY.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {HERO_COPY.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
