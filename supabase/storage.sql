-- CHANDRABHUSHAN ONLINE — Supabase Storage setup for admin image uploads.
-- Run this ONCE in Supabase Dashboard → SQL Editor (after supabase/schema.sql).
-- It creates a PUBLIC bucket called "images". Public read means anyone can
-- view an uploaded image via its public URL (that is how service/product
-- images display on the live site). Writes are restricted to signed-in
-- users (the admin signs in via Supabase Auth, and /admin also checks
-- ADMIN_EMAILS), so random visitors cannot upload or delete images.
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- Public read: anyone can view images.
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'images');

-- Authenticated upload: only signed-in users (admin) can upload.
create policy "Authenticated upload images"
  on storage.objects for insert
  with check (bucket_id = 'images' and auth.role() = 'authenticated');

-- Authenticated update/delete: only signed-in users (admin) can change/remove.
create policy "Authenticated update images"
  on storage.objects for update
  using (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Authenticated delete images"
  on storage.objects for delete
  using (bucket_id = 'images' and auth.role() = 'authenticated');
