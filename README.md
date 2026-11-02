# CHANDRABHUSHAN ONLINE — Full Website (Next.js + Supabase)

A full, production-ready service-centre website: public pages, service/product
management, inquiry saving, and an admin panel — built with Next.js (App Router,
JavaScript), React, plain CSS, and Supabase. No Tailwind, no custom server,
so it is Vercel-ready.

## What is included

Public routes: `/` (Home), `/about`, `/products`, `/products/[id]`,
`/gallery`, `/contact`, `/services` (category filter + Active / Expired /
Upcoming badges, red deadline badge when 7 days or fewer remain),
`/services/[id]`, `/services/[id]/inquiry`.

Admin routes: `/admin` (login), `/admin/dashboard` (counts + recent inquiries),
`/admin/services`, `/admin/services/[id]`, `/admin/products`,
`/admin/products/[id]`, `/admin/inquiries` (mark read/unread).

Contact (from the original site): phone 7488578184,
email infochandrabhushan74@gmail.com, WhatsApp 917488578184, hours 9 AM – 7 PM.
The shop photo is in `public/shop.jpeg`.

## How to make it live (owner steps — nothing here is created for you)

### 1. Create a Supabase project
1. Go to supabase.com and create a free project.
2. In Supabase Dashboard → SQL Editor, paste and run `supabase/schema.sql`.
   This creates `products`, `services`, `inquiries` and enables Row Level Security:
   public can read products/services, public can only insert inquiries, and
   only authenticated users can write products/services or read/update inquiries.
3. In Supabase Dashboard → Authentication → Users, create an admin user
   (email + password). That email must be in your `ADMIN_EMAILS` list below.
4. Copy your Project URL and anon key from Settings → API.

### 2. Set environment variables (Vercel)
In Vercel → Project → Settings → Environment Variables, set:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
- `ADMIN_EMAILS` = comma-separated admin emails, e.g. `owner@example.com`

Never put these values in code, in git, or in a chat message. The repo only
contains `.env.example` with placeholders. Locally, copy it to `.env.local`
(ignored by git) with the same three values.

### 3. Deploy on Vercel
Import the repository into Vercel, set the three env vars above, and Deploy.
No build command change is needed (`npm run build`, standard Next.js).

### 4. Add content
Log in at `/admin` with the Supabase Auth admin email/password, then add
services and products. Inquiries submitted on the public site appear in
`/admin/inquiries`. For service/product photos, paste an image URL
(Supabase Storage URL recommended) in the Image URL field.

## Behaviour when Supabase is NOT configured
The build does **not** crash. Public pages show an honest empty state
("No services yet") and the admin page shows "Supabase not configured".
Inquiry forms validate on the server (name, 10-digit phone, message) and,
when Supabase is not configured, return a clear error and point the visitor
to WhatsApp instead of pretending the inquiry was saved.

## Admin security — how it works
- Admin login uses Supabase Auth email/password (`/admin`).
- Every admin server action re-checks the session with `getAdminUser()` in
  `lib/supabase-server.js`: the user must be signed in AND their email must
  be in `ADMIN_EMAILS`. Client-side hiding alone is never trusted.
- Admin writes use the session-carrying server client, so Supabase RLS
  (authenticated users only) is a second check on top of `ADMIN_EMAILS`.
- If `ADMIN_EMAILS` is empty, no one can pass the admin check.

## Security checklist
- [x] RLS on for all three tables (see `supabase/schema.sql`).
- [x] Secrets only in env vars; `.env.local` and `.env` are git-ignored.
- [x] Admin login required; every admin action re-checks the session.
- [x] Server-side input validation for inquiry forms.
- [x] No secrets, keys, or passwords are committed in this repo.
- [ ] Owner must still: use a strong admin password, keep `ADMIN_EMAILS`
      to as few people as possible, and rotate any key that was ever
      exposed in a public repo.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
npm run build
```

## Notes / limits (honest)
- No invented numbers or claims are in this site (no "1000+ forms" badge).
- Services/products start empty until the owner adds them in `/admin`.
- Image uploads are by URL for now; a future step could add Supabase Storage
  uploads from the admin forms.
- This is the full version built locally only. It has NOT been pushed to
  GitHub, NOT deployed to Vercel, and NO Supabase/Vercel project was created
  by the build — those steps need the owner's accounts (see steps 1–3 above).
