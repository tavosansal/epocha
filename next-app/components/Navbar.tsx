import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src="/img/world-clock.png" alt="logo" className="h-8" />
          <Link href="/" className="font-semibold text-lg">Epocha</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <ThemeToggle />
          <a href="https://github.com/tavosansal/epocha" target="_blank" rel="noreferrer">
            <img src="/img/octocat.png" className="h-5" />
          </a>
        </div>
      </div>
    </nav>
  )
}
