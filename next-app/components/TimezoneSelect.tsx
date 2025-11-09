import React, { useMemo, useState, useRef, useEffect } from 'react'
import { Input } from './ui/Input'

type Props = {
  timezones?: string[]
  value?: string | null
  onChange: (tz: string) => void
}

export default function TimezoneSelect({ timezones = [], value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [highlight, setHighlight] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  const list = useMemo(() => {
    if (!filter) return timezones
    return timezones.filter((t) => t.toLowerCase().includes(filter.toLowerCase()))
  }, [timezones, filter])

  useEffect(() => {
    setHighlight(0)
  }, [filter])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const apply = (tz?: string) => {
    setOpen(false)
  setFilter(tz || '')
    onChange(tz || '')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, Math.max(0, list.length - 1)))
      setOpen(true)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      apply(list[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      <Input
        placeholder={value || '(use guessed timezone)'}
        value={filter}
        onFocus={() => setOpen(true)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFilter(e.target.value); setOpen(true) }}
        onKeyDown={onKey}
        className="mb-2"
      />
      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded border bg-background shadow">
          {list.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">No timezones</div>
          ) : (
            list.map((tz, i) => (
              <div
                key={tz}
                className={`cursor-pointer px-3 py-2 text-sm ${i === highlight ? 'bg-accent/60' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => { e.preventDefault(); apply(tz) }}
              >
                {tz}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
