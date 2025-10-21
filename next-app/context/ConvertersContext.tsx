import React, { createContext, useContext, useEffect, useState } from 'react'

export type Converter = {
  id: number
  label?: string
  timestamp?: number | null
  timezone?: string | null
}

type ConvertersContextValue = {
  converters: Converter[]
  addConverter: () => void
  updateConverter: (id: number, patch: Partial<Converter>) => void
  removeConverter: (id: number) => void
}

const STORAGE_KEY = 'epocha:converters'
const ConvertersContext = createContext<ConvertersContextValue | undefined>(undefined)

export function ConvertersProvider({ children }: { children: React.ReactNode }) {
  const [converters, setConverters] = useState<Converter[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setConverters(JSON.parse(raw))
      else {
        const seed: Converter[] = [{ id: Date.now(), label: '', timestamp: null, timezone: null }]
        setConverters(seed)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
      }
    } catch (e) {
      console.error('failed to read converters', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(converters))
    } catch (e) {
      console.error('failed to save converters', e)
    }
  }, [converters])

  const addConverter = () => {
    const c: Converter = { id: Date.now() + Math.random(), label: '', timestamp: null, timezone: null }
    setConverters((s) => [...s, c])
  }

  const updateConverter = (id: number, patch: Partial<Converter>) => {
    setConverters((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  const removeConverter = (id: number) => {
    setConverters((s) => s.filter((c) => c.id !== id))
  }

  return (
    <ConvertersContext.Provider value={{ converters, addConverter, updateConverter, removeConverter }}>
      {children}
    </ConvertersContext.Provider>
  )
}

export function useConverters() {
  const ctx = useContext(ConvertersContext)
  if (!ctx) throw new Error('useConverters must be used within ConvertersProvider')
  return ctx
}
