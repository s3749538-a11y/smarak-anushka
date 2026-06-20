'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoCarouselProps {
  images: { src: string; alt: string }[]
  autoPlayMs?: number
}

export function PhotoCarousel({ images, autoPlayMs = 4500 }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0)
  const [brokenSrcs, setBrokenSrcs] = useState<Set<string>>(new Set())

  // Filter out any image whose file doesn't exist (404) so half-filled
  // photo slots never show a broken-image icon — they just get skipped.
  const validImages = useMemo(
    () => images.filter((img) => !brokenSrcs.has(img.src)),
    [images, brokenSrcs]
  )

  const handleError = useCallback((src: string) => {
    setBrokenSrcs((prev) => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }, [])

  const next = useCallback(() => {
    setIndex((i) => (validImages.length ? (i + 1) % validImages.length : 0))
  }, [validImages.length])

  const prev = () => setIndex((i) => (validImages.length ? (i - 1 + validImages.length) % validImages.length : 0))

  useEffect(() => {
    // Keep index in range if the valid list shrinks (e.g. an image just 404'd)
    if (index >= validImages.length && validImages.length > 0) {
      setIndex(0)
    }
  }, [validImages.length, index])

  useEffect(() => {
    if (validImages.length <= 1) return
    const timer = setInterval(next, autoPlayMs)
    return () => clearInterval(timer)
  }, [next, autoPlayMs, validImages.length])

  if (images.length === 0) return null

  // While images are still being probed, render all candidates (hidden via
  // opacity/zero-size on error) so onError actually fires for each of them —
  // an image that's never mounted never gets a chance to report broken.
  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-ink-50">
      {images.map((img, i) => {
        const isBroken = brokenSrcs.has(img.src)
        const validIdx = validImages.findIndex((v) => v.src === img.src)
        const isActive = !isBroken && validIdx === index
        return (
          <div
            key={img.src}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              isActive ? 'opacity-100' : 'opacity-0',
              isBroken && 'pointer-events-none'
            )}
            aria-hidden={!isActive}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              onError={() => handleError(img.src)}
            />
          </div>
        )
      })}

      {validImages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="text-sm text-ink-400">
            add your photos to <code className="text-ink-600">public/images/moments/</code>
          </p>
        </div>
      )}

      {validImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-white text-ink-700 shadow-sm transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-white text-ink-700 shadow-sm transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-4 flex-wrap">
            {validImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
