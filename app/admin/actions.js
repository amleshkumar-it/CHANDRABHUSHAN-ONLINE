'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSupabase, getAdminUser } from '../../lib/supabase-server';

function mustAdmin() { return getAdminUser(); }
function num(v) { const n = Number(v); return isNaN(n) ? null : n; }
function str(v) { return String(v || '').trim(); }
// Upload an image file chosen on the admin's own computer to Supabase
// Storage (public bucket "images") and return its public URL. Returns null
// when no file was chosen. Throws a friendly error on bad type/size or a
// failed upload — the bucket must exist first (see supabase/storage.sql),
// otherwise the upload fails and the form is not saved.
async function uploadImageFile(sb, file, folder) {
  if (!file || typeof file !== 'object' || !file.size) return null;
  if (!String(file.type || '').startsWith('image/')) throw new Error('Please choose an image file (JPG, PNG, WebP or similar).');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image is too large. Please choose an image under 5 MB.');
  const ext = String(file.name || '').split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from('images').upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw new Error(`Image upload failed: ${error.message}. Make sure the public "images" bucket exists in Supabase Storage.`);
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl;
}
async function imageUrlFromForm(sb, formData, folder) {
  const uploaded = await uploadImageFile(sb, formData.get('image_file'), folder);
  if (uploaded) return uploaded;
  return str(formData.get('image_url')) || null;
}

export async function loginAdmin(prevState, formData) {
  // NOTE: LoginForm uses useFormState, so React calls this as
  // (prevState, formData) — NOT (formData). The old single-arg version
  // treated prevState (null) as formData and crashed on formData.get(),
  // which is exactly the POST /admin 500 "Cannot read properties of null
  // (reading 'get')" in the Vercel logs. Never throw from login: return a
  // friendly error instead, so a Supabase outage shows "Login failed" in
  // the form, not a server exception page. redirect() stays outside the
  // try/catch on purpose (it throws by design).
  if (!formData || typeof formData.get !== 'function') return { ok: false, error: 'Login form data missing. Please try again.' };
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
      apply_link: str(formData.get('apply_link')) || null, image_url: await imageUrlFromForm(sb, formData, 'services'),
    };
    if (!row.title || !row.category) return { ok: false, error: 'Title and category are required.' };
    const { error } = id ? await sb.from('services').update(row).eq('id', id) : await sb.from('services').insert(row);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/services'); revalidatePath('/'); revalidatePath('/admin/services');
    if (id) revalidatePath(`/services/${id}`);
  } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/services');
}
export async function saveShopService(formData) {
  try {
    const sb = await adminClient();
    const id = str(formData.get('id'));
    const row = {
      title: str(formData.get('title')), category: str(formData.get('category')),
      description: str(formData.get('description')),
      image_url: await imageUrlFromForm(sb, formData, 'shop-services'),
    };
    if (!row.title || !row.category) return { ok: false, error: 'Title and category are required.' };
    const { error } = id ? await sb.from('shop_services').update(row).eq('id', id) : await sb.from('shop_services').insert(row);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/hamari-sevayein'); revalidatePath('/admin/shop-services');
    if (id) revalidatePath(`/hamari-sevayein/${id}`);
  } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/shop-services');
}
export async function deleteShopService(formData) {
  try { const sb = await adminClient(); await sb.from('shop_services').delete().eq('id', str(formData.get('id'))); revalidatePath('/hamari-sevayein'); } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/shop-services');
}
export async function deleteService(formData) {
  try { const sb = await adminClient(); await sb.from('services').delete().eq('id', str(formData.get('id'))); revalidatePath('/services'); } catch (e) { return { ok: false, error: e.message }; }
  redirect('/admin/services');
}
export async function saveProduct(formData) {
  try {
    const sb = await adminClient();
    const id = str(formData.get('id'));
    const row = { name: str(formData.get('name')), description: str(formData.get('description')), price: num(formData.get('price')), image_url: await imageUrlFromForm(sb, formData, 'products') };
    if (!row.name) return { ok: false, error: 'Product name is required.' };
    const { error } = id ? await sb.from('products').update(row).eq('id', id) : await sb.from('products').insert(row);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/products'); revalidatePath('/admin/products'); revalidatePath('/gallery');
    if (id) revalidatePath(`/products/${id}`);
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
