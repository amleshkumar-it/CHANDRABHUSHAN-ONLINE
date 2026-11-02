import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Server client tied to the browser session (for admin auth). Null when not
// configured OR when the client cannot be created (bad env, cookie error).
// It must NEVER throw: a throw here used to become a Next.js server
// exception page on /admin instead of the login form.
export function getServerSupabase() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url.includes('your-project') || key.includes('your-anon-key')) return null;
    // Reject a malformed URL before the Supabase client can throw on it.
    try { new URL(url); } catch { return null; }
    const cookieStore = cookies();
    if (!cookieStore) return null;
    return createServerClient(url, key, {
      cookies: {
        getAll() { try { const all = cookieStore.getAll(); return Array.isArray(all) ? all : []; } catch { return []; } },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    });
  } catch {
    return null;
  }
}
// Env-only check: no cookies() call, so /admin does not need a second
// cookie snapshot just to decide whether Supabase is configured.
export function isSupabaseEnvConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon-key')) return false;
  try { new URL(url); } catch { return false; }
  return true;
}
export function adminEmails() {
  return (process.env.ADMIN_EMAILS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}
// Returns the logged-in user only if their email is on the ADMIN_EMAILS list.
// Every admin server action must call this — never trust client-side hiding.
// NEVER throws: any auth/network/cookie failure is treated as "not logged
// in" (null), so callers show the login form / redirect instead of crashing.
export async function getAdminUser() {
  try {
    const sb = getServerSupabase();
    if (!sb) return null;
    const { data, error } = await sb.auth.getUser();
    if (error || !data || !data.user || !data.user.email) return null;
    const allowed = adminEmails();
    if (allowed.length === 0) return null;
    if (!allowed.includes(data.user.email.toLowerCase())) return null;
    return data.user;
  } catch {
    return null;
  }
}
