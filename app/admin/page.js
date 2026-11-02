export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../lib/supabase-server';
import LoginForm from '../../components/LoginForm';
export default async function AdminHome() {
  const user = await getAdminUser();
  if (user) redirect('/admin/dashboard');
  if (!getServerSupabase()) {
    return (<><h1>Admin Panel</h1><p className="alert">Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_EMAILS in your environment (Vercel env vars), run supabase/schema.sql, and create an admin user in Supabase Auth first. See README.</p></>);
  }
  return (<><h1>Admin Login</h1><LoginForm /></>);
}
