'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/use-auth'

const NAV_LINKS = [
  { label: 'about', href: '#about' },
  { label: "what i'm into", href: '#interests' },
  { label: 'discover', href: '#discovery' },
]

export function Navbar() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-ink-100">
      <nav className="container mx-auto px-4 max-w-5xl flex items-center justify-between h-16">
        <a href="#" className="font-display italic text-h3 text-ink-900">
          smarak
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-600 hover:text-pink-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="hidden sm:inline text-xs text-ink-300 hover:text-ink-500 transition-colors"
          >
            switch
          </button>
          <Button
            size="sm"
            onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            let&apos;s start
          </Button>
        </div>
      </nav>
    </header>
  )
}
