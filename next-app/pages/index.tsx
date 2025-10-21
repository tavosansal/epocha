import Navbar from '../components/Navbar'
import UnixConverter from '../components/UnixConverter'
import { useConverters } from '../context/ConvertersContext'
import React from 'react'

export default function Home() {
  const { converters, addConverter } = useConverters()

  return (
    <div>
      <Navbar />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">Epocha <img src="/img/world-clock.png" className="h-10"/></h1>
        <p className="mb-4 text-slate-600">Easy epoch to date converter</p>

        <div className="mb-4">
          <button className="px-3 py-1 border rounded" onClick={addConverter}>+ Add New</button>
        </div>

        <div>
          {converters.map((c) => (
            <UnixConverter key={c.id} converter={c} />
          ))}
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold">What is epoch time?</h3>
          <p className="text-sm text-slate-600">The Unix timestamp represents the number of seconds since 00:00:00 UTC on January 1, 1970.</p>
        </div>
      </main>
    </div>
  )
}
