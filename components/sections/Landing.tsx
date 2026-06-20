'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InkReveal from '@/components/ui/ink-reveal'
import { Button } from '@/components/ui/button'
import { LANDING_COPY } from '@/lib/constants'

export function Landing({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 650)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink-900"
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative h-full w-full overflow-hidden">
            {/* Bottom layer: the reveal message — hidden until scratched */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 px-6">
              <div className="max-w-md text-center">
                <div className="space-y-4">
                  {LANDING_COPY.revealText.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                      className="font-display text-lg text-white leading-relaxed drop-shadow-sm"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* Top layer: the ink mask. Scratching it (destination-out)
                cuts holes that let the message underneath show through. */}
            <InkReveal
              maskColor={[60, 16, 30]}
              className="absolute inset-0 z-10"
              brushSize={150}
              lifetime={550}
              permanent
              onFirstStamp={() => setRevealed(true)}
            />

            {/* Prompt text painted ON the mask itself, fades once scratching starts */}
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none"
              animate={{ opacity: revealed ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-md text-center">
                <p className="text-sm uppercase tracking-widest text-white/50 mb-3">
                  {LANDING_COPY.eyebrow}
                </p>
                <h1 className="font-display italic text-h1 text-white mb-3">
                  {LANDING_COPY.headline}
                </h1>
                <p className="text-h3 text-white/80 mb-6">{LANDING_COPY.subheadline}</p>
                <p className="text-body text-white/60 animate-pulse">{LANDING_COPY.body}</p>
              </div>
            </motion.div>

            {/* CTA button — its own top layer, above the canvas, so it's
                always clickable once revealed regardless of canvas pointer capture */}
            <motion.div
              className="absolute inset-0 z-30 flex items-end justify-center pb-16 px-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="pointer-events-auto">
                <Button
                  onClick={handleEnter}
                  withParticles
                  className="bg-white text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                >
                  {LANDING_COPY.cta}
                </Button>
              </div>
            </motion.div>

            {/* Always-clickable skip link, for anyone who'd rather not scratch */}
            <button
              onClick={handleEnter}
              className="absolute bottom-5 right-5 z-30 text-sm text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline drop-shadow-sm"
            >
              skip →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
