import React, { createContext, useContext, useEffect, useState } from 'react';

export type Converter = {
  id: number;
  label?: string;
  timestamp?: number | null;
  timezone?: string | null;
};

type ConvertersContextValue = {
  converters: Converter[];
  addConverter: () => void;
  updateConverter: (id: number, patch: Partial<Converter>) => void;
  removeConverter: (id: number) => void;
};

const STORAGE_KEY = 'epocha:converters';
const ConvertersContext = createContext<ConvertersContextValue | undefined>(undefined);

export function ConvertersProvider({ children }: { children: React.ReactNode }) {
  // Start with an empty array for SSR safety. We'll hydrate from localStorage
  // on the client and avoid writing back until hydration completes. This
  // prevents the initial empty value from overwriting a stored value.
  const [converters, setConverters] = useState<Converter[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // run only on client
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setConverters(JSON.parse(raw) as Converter[]);
      } else {
        const seed: Converter[] = [{ id: Date.now(), label: '', timestamp: null, timezone: null }];
        setConverters(seed);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        } catch (e) {
          console.error('failed to persist seed converters', e);
        }
      }
    } catch (e) {
      console.error('failed to read converters on mount', e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist changes only after hydration to avoid clobbering existing data
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(converters));
    } catch (e) {
      console.error('failed to save converters', e);
    }
  }, [converters, hydrated]);

  const addConverter = () => {
    const c: Converter = { id: Date.now() + Math.random(), label: '', timestamp: null, timezone: null };
    setConverters((s) => [...s, c]);
  };

  const updateConverter = (id: number, patch: Partial<Converter>) => {
    setConverters((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeConverter = (id: number) => {
    setConverters((s) => s.filter((c) => c.id !== id));
  };

  return (
    <ConvertersContext.Provider value={{ converters, addConverter, updateConverter, removeConverter }}>
      {children}
    </ConvertersContext.Provider>
  );
}

export function useConverters() {
  const ctx = useContext(ConvertersContext);
  if (!ctx) throw new Error('useConverters must be used within ConvertersProvider');
  return ctx;
}
