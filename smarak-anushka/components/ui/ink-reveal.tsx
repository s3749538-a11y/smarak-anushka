'use client'

import { useEffect, useRef, useCallback } from 'react'

interface InkRevealProps {
  maskColor?: [number, number, number]
  brushSize?: number
  lifetime?: number
  rStart?: number
  rVary?: number
  stampStep?: number
  maxStamps?: number
  segments?: number
  wobble?: [number, number, number]
  gradientInnerRadius?: number
  gradientStops?: [number, number, number]
  className?: string
  style?: React.CSSProperties
  onFirstStamp?: () => void
  /** If true, stamps permanently carve through the mask instead of fading back. */
  permanent?: boolean
}

interface Stamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
  baked?: boolean
}

export default function InkReveal({
  maskColor = [252, 250, 248],
  brushSize = 130,
  lifetime = 650,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
  onFirstStamp,
  permanent = false,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bakedCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const stampsRef = useRef<Stamp[]>([])
  const runningRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const dimsRef = useRef({ w: 0, h: 0 })
  const firedRef = useRef(false)

  const mc = maskColor

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = parent.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    dimsRef.current = { w, h }
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`
    ctx.fillRect(0, 0, w, h)

    if (permanent) {
      if (!bakedCanvasRef.current) {
        bakedCanvasRef.current = document.createElement('canvas')
      }
      const baked = bakedCanvasRef.current
      baked.width = canvas.width
      baked.height = canvas.height
      const bctx = baked.getContext('2d')
      if (bctx) {
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        bctx.clearRect(0, 0, w, h)
      }
    }
  }, [mc, permanent])

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(x, y, r * gradientInnerRadius, x, y, r)
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`)
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`)
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`)
      ctx.fillStyle = g

      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7)
        const px = x + Math.cos(a) * r * wob
        const py = y + Math.sin(a) * r * wob
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  )

  const addStamp = useCallback(
    (x: number, y: number) => {
      if (!firedRef.current) {
        firedRef.current = true
        onFirstStamp?.()
      }
      const stamps = stampsRef.current
      if (stamps.length >= maxStamps) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      })
    },
    [brushSize, rVary, maxStamps, onFirstStamp]
  )

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current
      if (!last) {
        addStamp(x, y)
      } else {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / stampStep))
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps)
        }
      }
      lastPosRef.current = { x, y }
    },
    [addStamp, stampStep]
  )

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h } = dimsRef.current
    const now = performance.now()
    const stamps = stampsRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Base fill
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`
    ctx.fillRect(0, 0, w, h)

    // Composite permanently-baked holes (if any) before drawing live stamps
    if (permanent && bakedCanvasRef.current) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.drawImage(bakedCanvasRef.current, 0, 0, w, h)
    }

    ctx.globalCompositeOperation = 'destination-out'

    for (let i = stamps.length - 1; i >= 0; i--) {
      const stamp = stamps[i]
      const t = (now - stamp.born) / lifetime

      if (permanent) {
        // Once a stamp finishes growing, bake it into the permanent
        // layer at full strength and drop it from the live list so it
        // never fades — the hole stays carved for good.
        if (t >= 1 && !stamp.baked) {
          const baked = bakedCanvasRef.current
          if (baked) {
            const bctx = baked.getContext('2d')
            if (bctx) {
              bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
              bctx.globalCompositeOperation = 'source-over'
              carveInk(bctx, stamp.x, stamp.y, stamp.rmax, stamp.seed, 1)
            }
          }
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - Math.min(t, 1), 3)
        const r = rStart + (stamp.rmax - rStart) * ease
        carveInk(ctx, stamp.x, stamp.y, r, stamp.seed, 1)
      } else {
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        const r = rStart + (stamp.rmax - rStart) * ease
        const alpha = 1 - t * t
        carveInk(ctx, stamp.x, stamp.y, r, stamp.seed, alpha)
      }
    }

    if (stamps.length) {
      requestAnimationFrame(loop)
    } else {
      runningRef.current = false
    }
  }, [carveInk, mc, lifetime, rStart, permanent])

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true
      requestAnimationFrame(loop)
    }
  }, [loop])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  const getRelativePos = (clientX: number, clientY: number, el: HTMLCanvasElement) => {
    const rect = el.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        cursor: 'none',
        touchAction: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        const pos = getRelativePos(e.clientX, e.clientY, e.currentTarget)
        lastPosRef.current = pos
        stampAlong(pos.x, pos.y)
        startLoop()
      }}
      onMouseMove={(e) => {
        const pos = getRelativePos(e.clientX, e.clientY, e.currentTarget)
        stampAlong(pos.x, pos.y)
        startLoop()
      }}
      onMouseLeave={() => {
        lastPosRef.current = null
      }}
      onTouchStart={(e) => {
        const t = e.touches[0]
        const pos = getRelativePos(t.clientX, t.clientY, e.currentTarget)
        lastPosRef.current = pos
        stampAlong(pos.x, pos.y)
        startLoop()
      }}
      onTouchMove={(e) => {
        e.preventDefault()
        const t = e.touches[0]
        const pos = getRelativePos(t.clientX, t.clientY, e.currentTarget)
        stampAlong(pos.x, pos.y)
        startLoop()
      }}
      onTouchEnd={() => {
        lastPosRef.current = null
      }}
    />
  )
}
