-- Everweight: initial schema.
-- Apply with: supabase db push

create table if not exists public.weight_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null default current_date,
  weight numeric(6, 2) not null,
  unit text not null default 'kg' check (unit in ('kg', 'lb')),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists weight_entries_user_id_logged_on_idx
  on public.weight_entries(user_id, logged_on desc);

alter table public.weight_entries enable row level security;

create policy "Users can view their own entries"
  on public.weight_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own entries"
  on public.weight_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own entries"
  on public.weight_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own entries"
  on public.weight_entries for delete
  using (auth.uid() = user_id);