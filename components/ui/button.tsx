'use client'

import { ButtonHTMLAttributes, forwardRef, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'default' | 'sm'
  withParticles?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', withParticles = false, ...props }, ref) => {
    const [showParticles, setShowParticles] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withParticles) {
        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 600)
      }
      props.onClick?.(e)
    }

    const actualRef = ref || buttonRef

    return (
      <>
        {withParticles && showParticles && (
          <SuccessParticles buttonRef={actualRef as React.RefObject<HTMLButtonElement>} />
        )}
        <button
          ref={actualRef}
          className={cn(
            'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            size === 'default' ? 'px-6 py-3 text-body' : 'px-4 py-2 text-sm',
            variant === 'primary' &&
              'bg-pink-500 text-white hover:bg-pink-600 shadow-sm hover:shadow-md hover:-translate-y-0.5',
            variant === 'outline' &&
              'border border-ink-100 text-ink-700 hover:border-pink-400 hover:text-pink-600 bg-transparent',
            variant === 'ghost' && 'text-ink-600 hover:text-pink-600 bg-transparent',
            showParticles && 'scale-95',
            className
          )}
          onClick={handleClick}
          {...props}
        />
      </>
    )
  }
)
Button.displayName = 'Button'

function SuccessParticles({ buttonRef }: { buttonRef: React.RefObject<HTMLButtonElement> }) {
  const rect = buttonRef.current?.getBoundingClientRect()
  if (!rect) return null

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  return (
    <AnimatePresence>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className='fixed w-1 h-1 bg-pink-500 rounded-full pointer-events-none'
          style={{ left: centerX, top: centerY }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  )
}
