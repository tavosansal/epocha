import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment-timezone'
import TimezoneSelect from './TimezoneSelect'
import useCurrentTime from '../hooks/useCurrentTime'
import { useConverters, Converter } from '../context/ConvertersContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Label from '@/components/ui/Label'

export default function UnixConverter({ converter }: { converter: Converter }) {
  const { updateConverter, removeConverter } = useConverters()
  const { currentTime, timezones, currentTimezone: guessed } = useCurrentTime()

  const [isPlaying, setIsPlaying] = useState(true)
  const [pausedTime, setPausedTime] = useState<number | null>(converter.timestamp || null)
  const timezone = converter.timezone || guessed

  useEffect(() => {
    if (converter.timestamp) {
      setIsPlaying(false)
      setPausedTime(converter.timestamp)
    }
  }, [converter.timestamp])

  const displayTimestamp = isPlaying ? currentTime : pausedTime

  const humanDate = useMemo(() => {
    const ts = displayTimestamp
    if (!ts) return ''
    const m = moment.unix(ts).tz(timezone)
    return m.format('YYYY-MM-DDTHH:mm:ss')
  }, [displayTimestamp, timezone])

  const humanDateUtc = useMemo(() => {
    const ts = displayTimestamp
    if (!ts) return ''
    return moment.unix(ts).utc().format('YYYY-MM-DDTHH:mm:ss')
  }, [displayTimestamp])

  const isoString = useMemo(() => {
    const ts = displayTimestamp
    return ts ? new Date(ts * 1000).toISOString() : ''
  }, [displayTimestamp])

  const saveLabel = (label: string) => updateConverter(converter.id, { label })
  const onPause = () => {
    const toPause = pausedTime || currentTime
    setPausedTime(toPause)
    updateConverter(converter.id, { timestamp: toPause })
    setIsPlaying(false)
  }
  const onPlay = () => {
    setIsPlaying(true)
    setPausedTime(null)
    updateConverter(converter.id, { timestamp: null })
  }

  const convertTimestamp = (value: string) => {
    const num = parseInt(value, 10)
    if (!Number.isNaN(num)) {
      setPausedTime(num)
      updateConverter(converter.id, { timestamp: num })
      setIsPlaying(false)
    }
  }

  const convertDate = (value: string) => {
    const m = moment(value).tz(timezone)
    if (m && m.isValid()) {
      const unix = m.unix()
      setPausedTime(unix)
      updateConverter(converter.id, { timestamp: unix })
      setIsPlaying(false)
    }
  }

  const timezoneChanged = (tz: string) => {
    updateConverter(converter.id, { timezone: tz })
  }

  return (
    <div className="bg-card shadow rounded p-4 h-full flex flex-col">
      <div className="mb-2">
        <Label>Label</Label>
  <Input value={converter.label || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveLabel(e.target.value)} />
      </div>

      <div className="mb-2">
        <Label>Unix Timestamp</Label>
  <p className="text-xs text-muted-foreground">Paste your own timestamp to pause live mode and see a date.</p>
  <Input value={displayTimestamp ?? ''} onFocus={onPause} onChange={(e: React.ChangeEvent<HTMLInputElement>) => convertTimestamp(e.target.value)} placeholder="Type a timestamp (ex. 1456249984)" />
      </div>

      <div className="mb-2">
        <Label>Date and Time ({timezone})</Label>
        <TimezoneSelect timezones={timezones} value={timezone} onChange={timezoneChanged} />
        <div className="h-2" />
  <Input type="datetime-local" step="1" value={humanDate} onFocus={onPause} onChange={(e: React.ChangeEvent<HTMLInputElement>) => convertDate(e.target.value)} />
      </div>

      <div className="mb-2">
        <Label>Date and Time (UTC)</Label>
        <Input readOnly value={humanDateUtc} />
      </div>

      <div className="mb-2">
        <Label>ISO Date (UTC)</Label>
        <Input readOnly value={isoString} />
      </div>

  <div className="flex items-center gap-2 mt-2 mt-auto">
          {isPlaying ? (
          <Button variant="ghost" onClick={onPause}>Pause Live Mode</Button>
        ) : (
          <Button variant="default" onClick={onPlay}>Play Live Mode</Button>
        )}

  <Button className="ml-auto" variant="destructive" onClick={() => { if (confirm('Are you sure you want to remove this converter?')) removeConverter(converter.id) }}>Delete</Button>
      </div>
    </div>
  )
}
