-- Digital Pathshala - Supabase Setup
-- Run this in your Supabase project SQL Editor

-- 1. Admissions table
create table if not exists public.admissions (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text,
  cls text,
  school text,
  fname text,
  femail text,
  mobile text
);

-- 2. Enable Row Level Security
alter table public.admissions enable row level security;

-- 3. Policies (anon insert + read for admin)
create policy "Allow anonymous insert"
on public.admissions for insert
to anon
with check (true);

create policy "Allow anonymous read"
on public.admissions for select
to anon
using (true);

-- 4. Storage bucket for images
insert into storage.buckets (id, name, public)
values ('achievements', 'achievements', true)
on conflict (id) do nothing;

-- 5. Storage policies
create policy "Allow public upload"
on storage.objects for insert
to anon
with check (bucket_id = 'achievements');

create policy "Allow public read"
on storage.objects for select
to anon
using (bucket_id = 'achievements');
