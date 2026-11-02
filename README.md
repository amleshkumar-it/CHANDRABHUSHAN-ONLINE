# CHANDRABHUSHAN ONLINE — Pure React Static Website

CHANDRABHUSHAN ONLINE is an online service centre website for government forms,
job applications, admit cards, results, and scholarships.

This is a **pure React static site**. It replaces the earlier Django version.
The Django code is still available in the git history of this repository, but
it is not part of the current working tree and it is not run by this site.

## What this version does — and does not do

**It does:**
- Show the public pages: Home, About, Products, Product Detail, Gallery,
  Contact, Services, Service Detail, and Service Inquiry.
- Filter services by category (Job / Admit Card / Form / Result / Scholarship)
  and show Active / Expired / Upcoming badges from the service dates.
- Let visitors send an inquiry through WhatsApp, with their details pre-filled.

**It deliberately does not have:**
- An admin panel (the old `/admin-panel/` and Django admin are gone).
- A database — services and products are edited as files, not in a dashboard.
- Saved inquiries — an inquiry sent from this site is **not stored** anywhere
  by the site itself. It only opens WhatsApp so the visitor can send it to the
  service centre directly.

## How to add services and products

Edit the data files — no database or admin login is needed:

- Services: `src/data/services.js` — copy the commented example object, fill in
  title, category, descriptions, required documents, eligibility, start/end
  dates (YYYY-MM-DD), apply link, and image. The status badge is computed
  automatically from the dates.
- Products: `src/data/products.js` — copy the commented example object and
  fill in name, description, price (₹), and image.
- Images: put image files in `public/` and refer to them as `/file-name.jpg`.
- Contact details (phone, email, WhatsApp, hours): `src/data/site.js`.

To remove a service or product, delete its object from the data file.

## Run locally

```bash
npm install
npm run dev
```

Then open the local address printed by Vite (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

This creates a `dist/` folder. Upload the contents of `dist/` to any static
host (for example GitHub Pages, Netlify, or Vercel's static hosting). The app
uses HashRouter, so it works without any server-side URL rewrites.

## Tech stack

- React 18 + Vite
- react-router-dom (HashRouter)
- Plain CSS (single stylesheet: `src/index.css`)
- No backend, no database, no Tailwind
