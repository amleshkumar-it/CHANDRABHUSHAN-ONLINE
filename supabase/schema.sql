-- CHANDRABHUSHAN ONLINE — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor, in order.
-- No real secrets are in this file.

create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  description text default '',
  price numeric,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null check (category in ('Job','Admit Card','Form','Result','Scholarship','Yojana')),
  short_description text default '',
  full_description text default '',
  required_documents text default '',
  eligibility text default '',
  start_date date,
  end_date date,
  apply_link text,
  image_url text,
  created_at timestamptz not null default now()
);

-- Shop services for /hamari-sevayein (added 4 Nov 2026): poster-based cards
-- for the shop's own services (Banking, Ayushman Card, Certificate, Other),
-- kept separate from Sarkari services. Banking is its own section on the
-- public page. Run this block in the SQL Editor on an existing database.
create table if not exists public.shop_services (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null check (category in ('Banking','Ayushman Card','Certificate','Other')),
  description text default '',
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.shop_services enable row level security;
create policy "public read shop_services" on public.shop_services for select using (true);
create policy "admin write shop_services" on public.shop_services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text,
  message text not null,
  service_id bigint references public.services(id) on delete set null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.inquiries enable row level security;

-- Public can READ products and services (the public website).
create policy "public read products" on public.products for select using (true);
create policy "public read services" on public.services for select using (true);

-- Public can INSERT inquiries only (the inquiry form). No public read/update/delete.
create policy "public insert inquiries" on public.inquiries for insert with check (true);

-- Only authenticated users (admin, signed in via Supabase Auth) can write
-- products/services, and only authenticated users can read/update inquiries.
-- The app additionally checks ADMIN_EMAILS in every admin server action,
-- so a signed-in non-admin still cannot use the admin panel.
create policy "admin write products" on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write services" on public.services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin read inquiries" on public.inquiries for select using (auth.role() = 'authenticated');
create policy "admin update inquiries" on public.inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Migration (3 Nov 2026): 'Yojana' was added to the site's category list
-- after the table was first created, but CREATE TABLE IF NOT EXISTS does
-- not change an existing CHECK constraint, so Yojana saves were rejected
-- by the database while every other category worked. Run these two lines
-- in the SQL Editor on an existing database to allow Yojana.
alter table public.services drop constraint if exists services_category_check;
alter table public.services add constraint services_category_check check (category in ('Job','Admit Card','Form','Result','Scholarship','Yojana'));

-- Optional: an admins table for future use. The app currently uses the
-- ADMIN_EMAILS environment list instead, so this table is NOT required.
-- create table if not exists public.admins (email text primary key, created_at timestamptz default now());
