import React, { useMemo, useState } from 'react'

type Props = {
  timezones?: string[]
  value?: string | null
  onChange: (tz: string) => void
}

export default function TimezoneSelect({ timezones = [], value, onChange }: Props) {
  const [filter, setFilter] = useState('')
  const list = useMemo(() => {
    if (!filter) return timezones
    return timezones.filter((t) => t.toLowerCase().includes(filter.toLowerCase()))
  }, [timezones, filter])

  return (
    <div>
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="Filter timezones"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select className="border rounded px-2 py-1 w-full" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">(use guessed timezone)</option>
        {list.map((tz) => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
    </div>
  )
}
