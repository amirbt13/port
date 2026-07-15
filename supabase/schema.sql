-- =====================================================================
-- Portfolio backend schema for Supabase (Postgres)
-- Run this once in the Supabase dashboard > SQL Editor.
-- =====================================================================

-- ---------- projects ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,          -- slug; also the storage folder name
  title       text not null,
  subtitle    text not null default '',
  description text not null default '',       -- HTML
  city        text not null default '',
  date_year   text not null default '',
  date_month  text not null default '',
  images      jsonb not null default '[]'::jsonb,  -- ordered [{ "url": "...", "path": "..." }]
  cover_url   text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_sort_order_idx on public.projects (sort_order);

-- ---------- site_settings (single row) ----------
create table if not exists public.site_settings (
  id               int primary key default 1,
  full_name        text not null default '',
  role_label       text not null default '',
  hero_intro       text not null default '',   -- English intro paragraph
  about_bio        text not null default '',   -- Persian bio (about-me)
  instagram_url    text not null default '',
  instagram_handle text not null default '',
  email            text not null default '',
  avatar_url       text,
  hero_bg_url      text,
  cv_url           text,
  updated_at       timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

-- Seed the single settings row if it does not exist yet.
insert into public.site_settings (id) values (1)
on conflict (id) do nothing;

-- ---------- keep updated_at fresh ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
-- Public site reads with the anon key; all writes go through the service-role
-- key (which bypasses RLS), so we only need public SELECT policies.
alter table public.projects      enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select
  using (true);

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings"
  on public.site_settings for select
  using (true);

-- =====================================================================
-- Storage buckets
-- Easiest: create them in the dashboard (Storage > New bucket), both PUBLIC:
--   - project-images
--   - assets
-- Or run the SQL below.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do nothing;
