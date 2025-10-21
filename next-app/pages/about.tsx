import Navbar from '../components/Navbar'
import React from 'react'
export default function About() {
  return (
    <div>
      <Navbar />
      <main className="container py-6">
        <h2 className="text-2xl font-bold">About</h2>
        <p>Created by <a href="http://twitter.com/tavosansal" target="_blank" rel="noreferrer">@tavosansal</a></p>
        <h3 className="mt-4 font-semibold">What is epoch time?</h3>
        <p className="text-sm text-slate-600">The Unix timestamp, also known as POSIX time or epoch time, is a system for tracking time in computing.</p>
      </main>
    </div>
  )
}
