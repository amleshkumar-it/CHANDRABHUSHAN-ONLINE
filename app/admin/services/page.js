export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../../lib/supabase-server';
import { getServices } from '../../../lib/supabase';
import { saveService, deleteService } from '../actions';
import { CATEGORIES } from '../../../lib/site';
import SaveButton from '../../../components/SaveButton';
import CompressedImageInput from '../../../components/CompressedImageInput';
export default async function AdminServices() {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  // List page only shows title + category, so fetch only those 3 columns
  // instead of the full text (full_description, documents, eligibility)
  // of every service. Falls back to the full fetch if the server client
  // is unavailable.
  let services = [];
  try {
    const sb = getServerSupabase();
    if (sb) {
      const { data, error } = await sb.from('services').select('id,title,category').order('created_at', { ascending: false });
      services = error ? await getServices() : (data || []);
    } else { services = await getServices(); }
  } catch { services = await getServices(); }
  return (
    <>
      <div className="page-head"><h1>Manage Services</h1></div><p><a href="/admin/dashboard">← Dashboard</a></p>
      <h2>Add New Service</h2>
      <form action={saveService} className="card" encType="multipart/form-data">
        <label>Title *</label><input name="title" required />
        <label>Category *</label><select name="category" required>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        <label>Short Description</label><textarea name="short_description" rows={3} />
        <label>Full Description</label><textarea name="full_description" rows={6} />
        <label>Required Documents</label><textarea name="required_documents" rows={4} />
        <label>Eligibility</label><textarea name="eligibility" rows={3} />
        <label>Start Date</label><input name="start_date" type="date" />
        <label>End Date</label><input name="end_date" type="date" />
        <label>Official Apply Link</label><input name="apply_link" type="url" />
        <label>Upload Image (from your computer)</label><CompressedImageInput /><p className="muted">Choose a file to upload it to Supabase Storage (max 5 MB). If you choose a file, it replaces the Image URL below. Leave both blank for no image.</p>
        <label>Image URL</label><input name="image_url" type="url" placeholder="https://... (Supabase Storage URL, or leave blank)" />
        <p><SaveButton label="Save Service" /></p>
      </form>
      <h2>Existing Services ({services.length})</h2>
      {services.map((s) => (
        <div className="card" key={s.id}>
          <strong>{s.title}</strong> — {s.category}
          <p><a href={`/admin/services/${s.id}`}>Edit</a></p>
          <form action={deleteService}><input type="hidden" name="id" value={s.id} /><button className="btn danger small" type="submit">Delete</button></form>
        </div>
      ))}
    </>
  );
}
