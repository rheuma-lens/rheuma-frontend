# RheumaLens Frontend

A Next.js 15 app for RheumaLens, built with TypeScript, Tailwind CSS, Supabase authentication, Zustand state management, TanStack Query, and a healthcare-focused UI.

## Features

- Next.js App Router architecture
- Supabase auth foundation
  - Sign in / sign up flow
  - Client-side auth provider with session handling
- Responsive dark/light UI
- Reusable design system based on shadcn-style primitives
- Upload page with Supabase storage integration
- Zustand upload queue state management
- React Hook Form + Zod validation for forms
- Framer Motion animations and soft shadows
- Toast notifications via Sonner

## Project structure

- `src/app/`
  - `page.tsx` — home route
  - `login/page.tsx` — login feature
  - `upload/page.tsx` — upload feature
- `src/components/`
  - `auth/` — auth provider wrapper
  - `layout/` — app shell, sidebar, top nav, mobile nav
  - `ui/` — shared UI primitives
  - `upload/` — upload dropzone UI
- `src/features/auth/` — auth logic, provider, route guards, server helpers
- `src/lib/` — Supabase client/server helpers, constants, utilities
- `src/store/` — Zustand stores for auth and upload queue
- `src/types/` — shared TypeScript interfaces and auth types

## Setup

1. Install dependencies

```bash
npm install
```

2. Add environment variables in `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Run the dev server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint / typecheck

```bash
npm run lint
npm run typecheck
```

## Notes

- The login page uses the existing Supabase auth architecture and form validation.
- The upload page is wired to Supabase storage and tracks upload progress in a local queue.
- `.gitignore` should prevent environment-specific files from being tracked.

## Helpful commands

- `npm run dev` — start local development
- `npm run build` — production build
- `npm run start` — start the built app
- `npm run typecheck` — run TypeScript checks
- `npm run format` — format files with Prettier
- `npm run lint` — run ESLint
