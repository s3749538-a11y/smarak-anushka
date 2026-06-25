'use client'

import { useEffect, useRef, useState } from 'react'

interface FloatingNoteProps {
  text: string
  side?: 'left' | 'right'
}

// A small note that fades in once when its wrapper scrolls into view,
// then fades back out after a few seconds — a little reward for scrolling,
// not a persistent UI element competing for attention.
export function FloatingNote({ text, side = 'right' }: FloatingNoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shown) {
          setVisible(true)
          setShown(true)
          const timer = setTimeout(() => setVisible(false), 4200)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className="relative h-0">
      <div
        className={`pointer-events-none absolute ${side === 'right' ? 'right-2 sm:right-6' : 'left-2 sm:left-6'} -top-2 z-20 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="font-display italic text-sm text-pink-500/80 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-pink-100 whitespace-nowrap">
          {text}
        </div>
      </div>
    </div>
  )
}
