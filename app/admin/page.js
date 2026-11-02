export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../lib/supabase-server';
import LoginForm from '../../components/LoginForm';
export default async function AdminHome() {
  // Defense in depth: getAdminUser() itself never throws now, but if anything
  // around auth ever fails, show the login form + a friendly alert — never a
  // Next.js "server-side exception" page. redirect() is deliberately kept
  // OUTSIDE the try/catch: Next.js implements redirect by throwing, and
  // swallowing that would break the logged-in redirect to /admin/dashboard.
  let user = null;
  let authFailed = false;
  try {
    user = await getAdminUser();
  } catch {
    user = null;
    authFailed = true;
  }
  if (user) redirect('/admin/dashboard');
  let configured = false;
  try {
    configured = getServerSupabase() !== null;
  } catch {
    configured = false;
  }
  if (!configured) {
    return (<><h1>Admin Panel</h1><p className="alert">Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_EMAILS in your environment (Vercel env vars), run supabase/schema.sql, and create an admin user in Supabase Auth first. See README.</p></>);
  }
  return (<><h1>Admin Login</h1>{authFailed && <p className="alert">Login check me kuch gadbad hui hai, please dobara try karein. Agar problem baar-baar aaye to Supabase env vars check karein.</p>}<LoginForm /></>);
}
