import { useEffect, useMemo, useState, type ClipboardEvent } from 'react';
import moment from 'moment-timezone';
import TimezoneSelect from './TimezoneSelect';
import useCurrentTime from '../hooks/useCurrentTime';
import { useConverters, Converter } from '../context/ConvertersContext';
import { Button } from '@/components/ui/Button';
import { Play, Pause } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import React from 'react';
import Label from '@/components/ui/Label';

export default function UnixConverter({ converter }: { converter: Converter }) {
  const { updateConverter, removeConverter } = useConverters();
  const { currentTime, timezones, currentTimezone: guessed } = useCurrentTime();

  const [isPlaying, setIsPlaying] = useState(true);
  const [pausedTime, setPausedTime] = useState<number | null>(converter.timestamp || null);
  const [dateInput, setDateInput] = useState<string>('');
  const [utcInput, setUtcInput] = useState<string>('');
  const [isoInput, setIsoInput] = useState<string>('');
  const [editingLocal, setEditingLocal] = useState(false);
  const [editingUtc, setEditingUtc] = useState(false);
  const [editingIso, setEditingIso] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const timezone = converter.timezone || guessed;

  useEffect(() => {
    if (converter.timestamp) {
      setIsPlaying(false);
      setPausedTime(converter.timestamp);
    }
  }, [converter.timestamp]);

  const displayTimestamp = isPlaying ? currentTime : pausedTime;

  const humanDate = useMemo(() => {
    if (invalid) return 'invalid date';
    const ts = displayTimestamp;
    if (!ts) return '';
    const m = moment.unix(ts).tz(timezone);
    return m.format('YYYY-MM-DDTHH:mm:ss');
  }, [displayTimestamp, timezone, invalid]);

  const humanDateUtc = useMemo(() => {
    if (invalid) return 'invalid date';
    const ts = displayTimestamp;
    if (!ts) return '';
    return moment.unix(ts).utc().format('YYYY-MM-DDTHH:mm:ss');
  }, [displayTimestamp, invalid]);

  const isoString = useMemo(() => {
    if (invalid) return 'invalid date';
    const ts = displayTimestamp;
    return ts ? new Date(ts * 1000).toISOString() : '';
  }, [displayTimestamp, invalid]);

  // sync input fields whenever the displayed timestamp changes and we're not actively editing
  useEffect(() => {
    if (!editingLocal) setDateInput(humanDate);
    if (!editingUtc) setUtcInput(humanDateUtc);
    if (!editingIso) setIsoInput(isoString);
    if (displayTimestamp) setInvalid(false);
    // intentionally include humanDate/humanDateUtc/isoString so inputs update when displayTimestamp updates
  }, [humanDate, humanDateUtc, isoString, editingLocal, editingUtc, editingIso, displayTimestamp]);

  const saveLabel = (label: string) => updateConverter(converter.id, { label });
  const onPause = () => {
    const toPause = pausedTime || currentTime;
    setPausedTime(toPause);
    updateConverter(converter.id, { timestamp: toPause });
    setIsPlaying(false);
  };
  const onPlay = () => {
    setIsPlaying(true);
    setPausedTime(null);
    updateConverter(converter.id, { timestamp: null });
  };

  const convertTimestamp = (value: string) => {
    const num = parseInt(value, 10);
    if (!Number.isNaN(num)) {
      setPausedTime(num);
      updateConverter(converter.id, { timestamp: num });
      setIsPlaying(false);
    }
  };

  // Try to parse a user-provided value into a unix seconds timestamp.
  // Supports:
  // - plain integers (seconds or milliseconds)
  // - ISO strings (assumed UTC when using isIso=true)
  // - local or timezone-aware date strings parsed by moment
  const parseToUnix = (value: string, _tz?: string, isIso?: boolean): number | null => {
    const v = (value || '').toString().trim();
    if (!v) return null;

    // plain integer (seconds or ms)
    if (/^-?\d+$/.test(v)) {
      let n = parseInt(v, 10);
      // if looks like milliseconds (13+ digits or large number), convert to seconds
      if (Math.abs(n) > 1e11) {
        n = Math.floor(n / 1000);
      }
      return n;
    }

    let m;
    if (isIso) {
      m = moment.utc(v);
    } else if (_tz) {
      m = moment.tz(v, _tz);
    } else {
      m = moment(v);
    }

    if (m && m.isValid()) return m.unix();
    return null;
  };

  // removed unused helper functions convertDate and convertIso

  // handlers for editable fields so user can type
  const handleLocalChange = (value: string) => {
    setDateInput(value);
    const unix = parseToUnix(value, timezone, false);
    if (unix !== null) {
      setPausedTime(unix);
      updateConverter(converter.id, { timestamp: unix });
      setIsPlaying(false);
      setInvalid(false);
      setUtcInput(moment.unix(unix).utc().format('YYYY-MM-DDTHH:mm:ss'));
      setIsoInput(new Date(unix * 1000).toISOString());
    } else {
      setPausedTime(null);
      setIsPlaying(false);
      setInvalid(true);
    }
  };

  const handleUtcChange = (value: string) => {
    setUtcInput(value);
    const unix = parseToUnix(value, undefined, true);
    if (unix !== null) {
      setPausedTime(unix);
      updateConverter(converter.id, { timestamp: unix });
      setIsPlaying(false);
      setInvalid(false);
      setDateInput(moment.unix(unix).tz(timezone).format('YYYY-MM-DDTHH:mm:ss'));
      setIsoInput(new Date(unix * 1000).toISOString());
    } else {
      setPausedTime(null);
      setIsPlaying(false);
      setInvalid(true);
    }
  };

  const handleIsoChange = (value: string) => {
    setIsoInput(value);
    const unix = parseToUnix(value, undefined, true);
    if (unix !== null) {
      setPausedTime(unix);
      updateConverter(converter.id, { timestamp: unix });
      setIsPlaying(false);
      setInvalid(false);
      setDateInput(moment.unix(unix).tz(timezone).format('YYYY-MM-DDTHH:mm:ss'));
      setUtcInput(moment.unix(unix).utc().format('YYYY-MM-DDTHH:mm:ss'));
    } else {
      setPausedTime(null);
      setIsPlaying(false);
      setInvalid(true);
    }
  };

  const handlePasteAndConvert = (e: ClipboardEvent<HTMLInputElement>, parser: (v_: string) => void) => {
    const text = e.clipboardData.getData('text');
    if (!text) return;
    e.preventDefault();
    parser(text);
  };

  const timezoneChanged = (tz: string) => {
    updateConverter(converter.id, { timezone: tz });
  };

  return (
    <div className="bg-card shadow rounded p-4 h-full flex flex-col">
      <div className="mb-2">
        <Label>Label</Label>
        <Input
          value={converter.label || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveLabel(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <Label>Unix Timestamp</Label>
        <p className="text-xs text-muted-foreground">Paste your own timestamp to pause live mode and see a date.</p>
        <Input
          value={displayTimestamp ?? ''}
          onFocus={onPause}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => convertTimestamp(e.target.value)}
          placeholder="Type a timestamp (ex. 1456249984)"
        />
      </div>

      <div className="mb-2">
        <Label>Date and Time ({timezone})</Label>
        <TimezoneSelect timezones={timezones} value={timezone} onChange={timezoneChanged} />
        <div className="h-2" />
        <Input
          type="datetime-local"
          step="1"
          value={dateInput}
          onFocus={() => {
            setEditingLocal(true);
            onPause();
          }}
          onBlur={() => setEditingLocal(false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLocalChange(e.target.value)}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
            handlePasteAndConvert(e, (v: string) => handleLocalChange(v))
          }
        />
      </div>

      <div className="mb-2">
        <Label>Date and Time (UTC)</Label>
        <Input
          value={utcInput}
          onFocus={() => {
            setEditingUtc(true);
            onPause();
          }}
          onBlur={() => setEditingUtc(false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUtcChange(e.target.value)}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
            handlePasteAndConvert(e, (v: string) => handleUtcChange(v))
          }
        />
      </div>

      <div className="mb-2">
        <Label>ISO Date (UTC)</Label>
        <Input
          value={isoInput}
          onFocus={() => {
            setEditingIso(true);
            onPause();
          }}
          onBlur={() => setEditingIso(false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIsoChange(e.target.value)}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
            handlePasteAndConvert(e, (v: string) => handleIsoChange(v))
          }
        />
      </div>

      <div className="flex items-center gap-2 mt-2 mt-auto">
        {isPlaying ? (
          <Button
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform transition"
            onClick={onPause}
          >
            <Pause className="mr-2 h-4 w-4 text-white" />
            Pause Live Mode
          </Button>
        ) : (
          <Button
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform transition"
            onClick={onPlay}
          >
            <Play className="mr-2 h-4 w-4 text-white" />
            Play Live Mode
          </Button>
        )}

        <Button
          className="ml-auto"
          variant="destructive"
          onClick={() => {
            if (confirm('Are you sure you want to remove this converter?')) removeConverter(converter.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
