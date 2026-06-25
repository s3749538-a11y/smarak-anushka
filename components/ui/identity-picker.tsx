'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

// Login passwords for each side.
const SMARAK_PASSWORD = 'Smarak@11323M'
const ANUSHKA_PASSWORD = 'Anushka@211008'

interface IdentityPickerProps {
  onChoose: (who: 'smarak' | 'anushka') => void
}

export function IdentityPicker({ onChoose }: IdentityPickerProps) {
  const [pendingWho, setPendingWho] = useState<'smarak' | 'anushka' | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const startLogin = (who: 'smarak' | 'anushka') => {
    setPendingWho(who)
    setPassword('')
    setError(false)
  }

  const handlePasswordSubmit = () => {
    if (!pendingWho) return
    const expected = pendingWho === 'smarak' ? SMARAK_PASSWORD : ANUSHKA_PASSWORD
    if (password === expected) {
      onChoose(pendingWho)
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!pendingWho ? (
        <>
          <button
            onClick={() => startLogin('anushka')}
            className="px-7 py-3.5 rounded-full bg-white text-pink-600 font-medium hover:bg-pink-50 hover:text-pink-700 transition-colors shadow-lg"
          >
            enter as anushka
          </button>
          <button
            onClick={() => startLogin('smarak')}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors mt-1"
          >
            <Lock className="w-3 h-3" />
            smarak login
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            placeholder="password"
            autoFocus
            className={cn(
              'w-full rounded-xl border bg-white/10 backdrop-blur px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors',
              error ? 'border-red-400' : 'border-white/30 focus:border-white/60'
            )}
          />
          {error && <p className="text-xs text-red-300">wrong password</p>}
          <button
            onClick={handlePasswordSubmit}
            disabled={!password}
            className="px-6 py-2 rounded-full bg-white text-pink-600 text-sm font-medium hover:bg-pink-50 disabled:opacity-40 transition-colors"
          >
            log in
          </button>
          <button
            onClick={() => {
              setPendingWho(null)
              setPassword('')
              setError(false)
            }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors mt-1"
          >
            ← back
          </button>
        </div>
      )}
    </div>
  )
}
