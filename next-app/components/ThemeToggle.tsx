"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"

// Simple shadcn-style ModeToggle: cycles between light -> dark -> system.
export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const cycle = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const isDark = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <Button variant="outline" size="icon" onClick={cycle} aria-label="Toggle theme">
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
    </Button>
  )
}

export default ModeToggle
