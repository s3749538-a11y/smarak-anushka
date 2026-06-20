'use client'

import { useState } from 'react'

interface FlirtyLine {
  text: string
  emoji: string
}

// Base "resting" position for each card in the stack (most-front first).
const BASE_OFFSETS = [
  { x: -50, y: 0, rot: -6 },
  { x: -18, y: 36, rot: -3 },
  { x: 14, y: 72, rot: 0 },
]

// When a card is hovered, the others fan out further so all three stay
// reachable and visible — instead of stacking directly on top of each other.
const HOVER_OFFSETS = [
  { x: -68, y: -8, rot: -10 },
  { x: -2, y: 18, rot: 1 },
  { x: 64, y: 50, rot: 9 },
]

function FlirtyCard({
  text,
  emoji,
  x,
  y,
  rot,
  zIndex,
  onMouseEnter,
  onMouseLeave,
}: {
  text: string
  emoji: string
  x: number
  y: number
  rot: number
  zIndex: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 flex h-28 w-64 sm:w-72 select-none flex-col justify-between rounded-2xl border-2 border-rose-200 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-lg shadow-rose-200/40 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-rose-400 hover:shadow-xl hover:shadow-rose-300/50"
      style={{
        zIndex,
        transform: `translate(${x}%, ${y}px) rotate(${rot}deg)`,
      }}
    >
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <p className="text-sm font-medium leading-snug text-rose-900">{text}</p>
    </div>
  )
}

export function FlirtyCardStack({ lines }: { lines: FlirtyLine[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const cards = lines.slice(0, 3)

  return (
    <div className="relative mx-auto h-72 w-full max-w-sm sm:max-w-md">
      {cards.map((line, i) => {
        const base = BASE_OFFSETS[i]
        const hover = HOVER_OFFSETS[i]
        const isActive = hovered === i
        // Fan everything out the moment any card in the stack is hovered,
        // so the back two are never trapped underneath the front one.
        const pos = hovered !== null ? hover : base
        return (
          <FlirtyCard
            key={i}
            text={line.text}
            emoji={line.emoji}
            x={pos.x}
            y={isActive ? pos.y - 10 : pos.y}
            rot={pos.rot}
            zIndex={isActive ? 40 : 30 - i * 10}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        )
      })}
    </div>
  )
}
