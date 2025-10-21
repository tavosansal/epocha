import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'epocha:theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeRaw] = useState<Theme>('system')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (raw === 'light' || raw === 'dark' || raw === 'system') setThemeRaw(raw)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (e) {
      // ignore
    }
    const root = document.documentElement
    const applyDark = theme === 'dark' || (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (applyDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return <ThemeContext.Provider value={{ theme, setTheme: setThemeRaw, isDark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
