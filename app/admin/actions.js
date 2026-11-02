'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSupabase, getAdminUser } from '../../lib/supabase-server';

function mustAdmin() { return getAdminUser(); }
function num(v) { const n = Number(v); return isNaN(n) ? null : n; }
function str(v) { return String(v || '').trim(); }

export async function loginAdmin(formData) {
  // Never throw from login: return a friendly error instead, so a Supabase
  // outage shows "Login failed" in the form, not a server exception page.
  // redirect() stays outside the try/catch on purpose (it throws by design).
  let sb = null;
  try { sb = getServerSupabase(); } catch { sb = null; }
  if (!sb) return { ok: false, error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel, and ADMIN_EMAILS.' };
  const email = str(formData.get('email')); const password = String(formData.get('password') || '');
  try {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: 'Login failed. Please check your email and password.' };
    const user = await getAdminUser();
    if (!user) { try { await sb.auth.signOut(); } catch {} return { ok: false, error: 'This email is not on the admin list (ADMIN_EMAILS). Access denied.' }; }
  } catch {
    return { ok: false, error: 'Login failed. Please check your email and password, then try again.' };
  }
  redirect('/admin/dashboard');
}
export async function logoutAdmin() {
  try { const sb = getServerSupabase(); if (sb) await sb.auth.signOut(); } catch {}
  redirect('/admin');
}
async function adminClient() {
  const user = await mustAdmin();
  if (!user) throw new Error('Admin access required.');
  // Use the session-carrying server client (not the anon client) so that
  // Supabase RLS sees the admin as an authenticated user. Writes are gated
  // BOTH by getAdminUser() (ADMIN_EMAILS list) here AND by RLS in schema.sql.
  const sb = getServerSupabase();
  if (!sb) throw new Error('Supabase is not configured.');
  return sb;
}
export async function saveService(formData) {
  try {
    const sb = await adminClient();
    const id = str(formData.get('id'));
    const row = {
      title: str(formData.get('title')), category: str(formData.get('category')),
      short_description: str(formData.get('short_description')), full_description: str(formData.get('full_description')),
      required_documents: str(formData.get('required_documents')), eligibility: str(formData.get('eligibility')),
      start_date: str(formData.get('start_date')) || null, end_date: str(formData.get('end_date')) || null,
      apply_link: str(formData.get('apply_link')) || null, image_url: str(formData.get('image_url')) || null,
    };
    if (!row.title || !row.category) return { ok: false, error: 'Title and category are required.' };
    const { error } = id ? await sb.from('services').update(row).eq('id', id) : await sb.from('services').insert(row);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/services'); revalidatePath('/'); revalidatePath('/admin/services');
  } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/services');
}
export async function deleteService(formData) {
  try { const sb = await adminClient(); await sb.from('services').delete().eq('id', str(formData.get('id'))); revalidatePath('/services'); } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/services');
}
export async function saveProduct(formData) {
  try {
    const sb = await adminClient();
    const id = str(formData.get('id'));
    const row = { name: str(formData.get('name')), description: str(formData.get('description')), price: num(formData.get('price')), image_url: str(formData.get('image_url')) || null };
    if (!row.name) return { ok: false, error: 'Product name is required.' };
    const { error } = id ? await sb.from('products').update(row).eq('id', id) : await sb.from('products').insert(row);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/products'); revalidatePath('/admin/products');
  } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/products');
}
export async function deleteProduct(formData) {
  try { const sb = await adminClient(); await sb.from('products').delete().eq('id', str(formData.get('id'))); revalidatePath('/products'); } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/products');
}
export async function toggleInquiryRead(formData) {
  try {
    const sb = await adminClient();
    const id = str(formData.get('id')); const is_read = formData.get('is_read') === 'true';
    await sb.from('inquiries').update({ is_read }).eq('id', id); revalidatePath('/admin/inquiries'); revalidatePath('/admin/dashboard');
  } catch (e) { return { ok: false, error: e.message }; }
}
