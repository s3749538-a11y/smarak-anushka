'use client'

import { Instagram, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FOOTER_COPY, SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="py-20 bg-gradient-to-b from-white to-pink-50/50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="font-display text-h2 text-ink-900 italic mb-3">{FOOTER_COPY.text}</h2>
        <p className="text-body text-ink-600 mb-8">{FOOTER_COPY.subtext}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            go back to questions
          </Button>
          <a
            href={SITE_CONFIG.instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-ink-100 text-ink-600 hover:text-pink-600 hover:border-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={SITE_CONFIG.githubHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-ink-100 text-ink-600 hover:text-pink-600 hover:border-pink-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        <p className="mt-12 text-sm text-ink-400">made by smarak, for {SITE_CONFIG.for}.</p>
      </div>
    </footer>
  )
}
