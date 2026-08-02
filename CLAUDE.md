@AGENTS.md

# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is
Everweight: a weight-tracking app. Email/password auth, a per-user weigh-in
log with a trend chart, deployed on Vercel. Built as a sample of the
GitHub → Claude Code → Supabase → Vercel pipeline — see `README.md` for the
full setup order.

## Commands
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run start` — run a production build locally
- `supabase db push` — apply pending migrations in `supabase/migrations/`

## Architecture
- **Server Actions, not API routes.** All mutations (`app/login/actions.ts`,
  `app/dashboard/actions.ts`) are Server Actions called directly from forms.
- **Two Supabase clients — don't mix them:**
  - `lib/supabase/client.ts` — browser client, for Client Components only
  - `lib/supabase/server.ts` — server client, for Server Components/Actions only
- **`proxy.ts`** (Next.js 16's replacement for `middleware.ts`) refreshes the
  auth session cookie on every request, redirects `/dashboard` → `/login`
  when signed out, and `/login` → `/dashboard` when signed in.
- **Database schema lives in `supabase/migrations/`**, not the Supabase
  dashboard — that's the source of truth. New tables or columns go through
  `supabase migration new <name>`, edit the generated SQL, then
  `supabase db push`.
- **Every table needs RLS.** Follow the pattern in
  `supabase/migrations/00000000000001_init.sql`: policies keyed on
  `auth.uid() = user_id` for select/insert/update/delete.
- **`WeightChart.tsx`** is a plain inline SVG server component — no chart
  library. If a requested change needs richer charting (zoom, tooltips,
  multiple series), that's the point to reach for a library instead of
  extending the hand-rolled SVG.

## Environment
Needs `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` — copy `.env.local.example` and fill in from
the Supabase dashboard (Settings → API).

## Conventions
- Server Actions for mutations, not client-side fetch or route handlers
- Tailwind utility classes only — no separate CSS files beyond `app/globals.css`
- Pages are Server Components by default; only add `'use client'` (see
  `components/EntryRow.tsx`) when something actually needs interactivity
- Theme is fixed light/cream + emerald — this app does not follow system
  dark mode by design; don't reintroduce a `prefers-color-scheme` override
  without being asked

## Extending this app
Typical next features and where they'd go:
- **New field on an entry** (e.g. mood, sleep) → migration to alter
  `weight_entries`, then update the form in `app/dashboard/page.tsx` and the
  insert in `app/dashboard/actions.ts`
- **New tracked metric entirely** (e.g. water intake) → new migration file,
  new table with the same RLS pattern, new route under `app/`
- **Email reminders / notifications** → this needs a scheduled job, which
  Vercel Cron or a Supabase Edge Function can handle — flag this explicitly
  since it's outside the current request-response pipeline
