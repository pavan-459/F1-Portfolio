# Pavan Krishna Nimmakuri — Portfolio

A Max Verstappen / Red Bull Racing–themed portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — Red Bull/Verstappen design tokens defined in `app/globals.css`
- **Framer Motion** — scroll reveals, animated stat counters, throttle-bar skill meters
- **React Three Fiber + drei** — interactive 3D hero centerpiece (`components/Hero3D.tsx`), with a WebGL-unavailable fallback

## Routes

- `/` — Home (3D hero, tagline, quick stats)
- `/about` — Bio + skills as throttle bars
- `/experience` — iTD Tech role with telemetry-style achievement cards
- `/projects` — 5 flagship projects
- `/contact` — Contact info + mailto CTA

## Images

Background photos live in `public/images/`: `hero-bg.avif`, `track-bg.jpg`, `about-bg.jpg`, `contact-bg.webp`, `projects-bg.webp`. Swap these files to update backgrounds — no code changes needed.

## Development

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```

> **Note:** this project uses Next.js 16, which has breaking changes vs. older Next.js versions. See `AGENTS.md` before making framework-level changes.
