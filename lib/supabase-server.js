import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Server client tied to the browser session (for admin auth). Null when not configured.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon-key')) return null;
  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
      },
    },
  });
}
export function adminEmails() {
  return (process.env.ADMIN_EMAILS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}
// Returns the logged-in user only if their email is on the ADMIN_EMAILS list.
// Every admin server action must call this — never trust client-side hiding.
export async function getAdminUser() {
  const sb = getServerSupabase();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user || !user.email) return null;
  const allowed = adminEmails();
  if (allowed.length === 0) return null;
  if (!allowed.includes(user.email.toLowerCase())) return null;
  return user;
}
