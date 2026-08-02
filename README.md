# Everweight — sample pipeline project

A working example of the exact pipeline requested: **GitHub → Claude Code →
Supabase → Vercel**, all connected, with real auth and a real dashboard
feature (not a stub). This is a weight-tracking app: sign up, log weigh-ins,
see a trend chart, all scoped privately per user.

## Stack

- **Next.js 16** (App Router, Server Actions)
- **Supabase** — Postgres, Auth, Row Level Security
- **Tailwind CSS 4**
- **Vercel** for hosting
- **Claude Code** for ongoing AI-assisted development (see `CLAUDE.md`)

---

## The pipeline, in order

This is the exact sequence to take this from a folder of code to a live,
updatable app — and the same sequence to follow for every change after that.

### 1. GitHub — where the code lives

```bash
gh repo create your-org/everweight --private --clone
cd everweight
# copy this project's files in
git add -A && git commit -m "Initial commit"
git push -u origin main
```

This repo is the single source of truth. Nothing is "live" until it's
pushed here.

### 2. Claude Code — how you keep building it

```bash
npm install -g @anthropic-ai/claude-code
claude
```

Run this inside the repo. Claude Code reads `CLAUDE.md` automatically, so it
already knows the project's conventions before you ask for anything. From
here on, building the app is: **describe the change in plain English, review
what Claude Code writes, commit, push.** For example: "Add a field for mood
alongside weight" or "Add a weekly average to the dashboard."

### 3. Supabase — the backend and database

- Create a project at [app.supabase.com](https://app.supabase.com)
- Copy the Project URL and anon key: Settings → API
- Apply the schema in `supabase/migrations/00000000000001_init.sql` — either
  paste it into the SQL Editor, or:

    ```bash
    npm install -g supabase
    supabase login
    supabase link --project-ref your-project-ref
    supabase db push
    ```

- This creates the `weight_entries` table with Row Level Security, so every
  user only ever sees their own data automatically, not something you have
  to remember to check for in every query.

### 4. Vercel — hosting and deployment

```bash
npm install -g vercel
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

Or connect the GitHub repo directly in the Vercel dashboard and add the same
two environment variables there. Once connected, **every push to `main`
deploys automatically** — that's the "flow through to a live app" part of
the pipeline. Every other branch gets its own preview URL, so you can see a
change live before it touches production.

### 5. Confirm the loop end-to-end

Visit the live URL, sign up, log a weigh-in, refresh — it's really in
Supabase, really served by Vercel, really built from what's in GitHub.

---

## The day-to-day loop once this is set up

1. Tell Claude Code what you want changed
2. Review the diff, run `npm run dev` to eyeball it locally
3. `git push`
4. Vercel deploys it automatically
5. If the change needs a new database field or table, Claude Code writes the
   migration too — run `supabase db push` before or after the app-code push

That five-step loop is the whole "feed in content and direction, have it
flow through to a live app" workflow — nothing about it changes as the app
grows.

## Project structure

```
app/
  page.tsx              landing page (routes to /login or /dashboard)
  login/
    page.tsx             sign in / sign up form
    actions.ts            server actions: signIn, signUp, signOut
  dashboard/
    page.tsx             protected page — stats, chart, log form, entry list
    actions.ts            server actions: addEntry, deleteEntry
components/
  EntryRow.tsx           client component for one entry's delete button
  WeightChart.tsx        inline SVG trend sparkline (no chart library)
lib/supabase/
  client.ts              browser Supabase client
  server.ts              server Supabase client (Server Components/Actions)
  middleware.ts          session refresh + route protection logic
proxy.ts                  Next.js 16's routing hook, wires up the above
supabase/migrations/      versioned schema — source of truth for the DB
.github/workflows/ci.yml  lint + build on every push/PR
CLAUDE.md                  project-specific guidance for Claude Code
```

supabase init
supabase link --project-ref jmkptdmtfzcekqduynca
