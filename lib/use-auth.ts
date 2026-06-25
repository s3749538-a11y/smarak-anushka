'use client'

import { useState, useEffect, useCallback } from 'react'

export type Identity = 'smarak' | 'anushka' | null

const STORAGE_KEY = 'sa-identity'

export function useAuth() {
  const [identity, setIdentity] = useState<Identity>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'smarak' || stored === 'anushka') {
        setIdentity(stored)
      }
    } catch {
      // localStorage unavailable (private browsing etc.) — just stay logged out
    } finally {
      setReady(true)
    }
  }, [])

  const login = useCallback((who: 'smarak' | 'anushka') => {
    setIdentity(who)
    try {
      localStorage.setItem(STORAGE_KEY, who)
    } catch {
      // ignore — session just won't persist
    }
  }, [])

  const logout = useCallback(() => {
    setIdentity(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { identity, ready, login, logout }
}
