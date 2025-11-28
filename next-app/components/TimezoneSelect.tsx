import { useMemo, useState, useRef, useEffect } from 'react';
import { Input } from './ui/Input';

// Plain, stable combobox: no Radix, no portals — simple input + filtered list.
export default function TimezoneSelect({
  timezones = [],
  value,
  onChange,
}: {
  timezones?: any[];
  value?: any;
  onChange: (tz_: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const ref = useRef<any>(null);

  const list = useMemo(() => {
    if (!filter) return timezones;
    return timezones.filter((t) => t.toLowerCase().includes(filter.toLowerCase()));
  }, [timezones, filter]);

  useEffect(() => {
    const onDoc = (e: any) => {
      if (!ref.current) return;
      // plain check without TypeScript 'as' casts so ESLint/parser doesn't choke
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center justify-between w-full rounded-md border px-3 py-2 bg-input text-sm cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="truncate">{value || '(use guessed timezone)'}</div>
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-64 overflow-hidden rounded border bg-background shadow">
          <div className="p-2">
            <Input placeholder="Filter timezones" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <div className="max-h-48 overflow-auto">
            {list.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">No timezones</div>
            ) : (
              list.map((tz) => (
                <div
                  key={tz}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-accent/10"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(tz);
                    setOpen(false);
                    setFilter(tz);
                  }}
                >
                  {tz}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
