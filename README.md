# Everweight sample pipeline project

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

## Getting started

This is a **test project** — the `.env.local` file is committed and contains real Supabase credentials for a throwaway account. No setup required.

### Prerequisites

- **Node.js 24+**

### Run it

```bash
git clone https://github.com/calvnce/Everweight.git
cd Everweight
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up with any email + password (it doesn't need to be real — email confirmation is off) and start logging weigh-ins.

### Build for production

```bash
npm run build
npm run start
```

### Stack
