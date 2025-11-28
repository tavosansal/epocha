# Epocha — Next.js migration

This folder contains a Next.js + Tailwind starter that mirrors the original Ember app UI and behavior.

Quick start:

1. cd next-app
2. npm install
3. npm run dev

Notes:

- Converters are saved to localStorage under `epocha:converters`.
- Timezones use `moment-timezone` and the current time updates every second.
- Static images used by the components should be copied from the repository's `public/img` into `next-app/public/img` so they are served by Next.

Next steps I can do for you on request:

- Copy static assets into `next-app/public/img`.
- Add tests, TypeScript, and more shadcn component wiring.
- Wire an Electron wrapper similar to the original.
