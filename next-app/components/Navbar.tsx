import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import WorldClockIcon from './icons/WorldClockIcon'

export default function Navbar() {
  return (
    <nav className="bg-background text-foreground border-b border-border">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <WorldClockIcon className="h-8 w-8 logo" />
          <Link href="/" className="font-semibold text-lg">Epocha</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <ThemeToggle />
          <a href="https://github.com/tavosansal/epocha" target="_blank" rel="noreferrer">
            <img src="/img/octocat.png" className="h-5 octocat" alt="GitHub" />
          </a>
        </div>
      </div>
    </nav>
  )
}
