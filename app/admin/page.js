export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, isSupabaseEnvConfigured } from '../../lib/supabase-server';
import LoginForm from '../../components/LoginForm';
export default async function AdminHome() {
  // Single auth check only: the old version called cookies() twice on this
  // page (once for auth, once for a "configured" check), which is what could
  // trip over a stale session cookie. The env check below touches no cookies.
  let user = null;
  let authFailed = false;
  try {
    user = await getAdminUser();
  } catch {
    user = null;
    authFailed = true;
  }
  if (user) redirect('/admin/dashboard');
  if (!isSupabaseEnvConfigured()) {
    return (<><h1>Admin Panel</h1><p className="alert">Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_EMAILS in your environment (Vercel env vars), run supabase/schema.sql, and create an admin user in Supabase Auth first. See README.</p></>);
  }
  return (<><h1>Admin Login</h1>{authFailed && <p className="alert">Login check me kuch gadbad hui hai, please dobara try karein. Agar problem baar-baar aaye to is site ki cookies clear karke dobara kholein.</p>}<LoginForm /></>);
}
