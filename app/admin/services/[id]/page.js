export const dynamic = 'force-dynamic';
import { redirect, notFound } from 'next/navigation';
import { getAdminUser } from '../../../../lib/supabase-server';
import { getService } from '../../../../lib/supabase';
import { saveService } from '../../actions';
import { CATEGORIES } from '../../../../lib/site';
import SaveButton from '../../../../components/SaveButton';
import CompressedImageInput from '../../../../components/CompressedImageInput';
export default async function EditService({ params }) {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  const s = await getService(params.id); if (!s) return notFound();
  return (
    <>
      <div className="page-head"><h1>Edit Service</h1></div><p><a href="/admin/services">← Back to Services</a></p>
      <form action={saveService} className="card" encType="multipart/form-data">
        <input type="hidden" name="id" value={s.id} />
        <label>Title *</label><input name="title" required defaultValue={s.title} />
        <label>Category *</label><select name="category" required defaultValue={s.category}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        <label>Short Description</label><textarea name="short_description" rows={3} defaultValue={s.short_description || ''} />
        <label>Full Description</label><textarea name="full_description" rows={6} defaultValue={s.full_description || ''} />
        <label>Required Documents</label><textarea name="required_documents" rows={4} defaultValue={s.required_documents || ''} />
        <label>Eligibility</label><textarea name="eligibility" rows={3} defaultValue={s.eligibility || ''} />
        <label>Start Date</label><input name="start_date" type="date" defaultValue={s.start_date || ''} />
        <label>End Date</label><input name="end_date" type="date" defaultValue={s.end_date || ''} />
        <label>Official Apply Link</label><input name="apply_link" type="url" defaultValue={s.apply_link || ''} />
        <label>Upload Image (from your computer)</label><CompressedImageInput /><p className="muted">Choose a file to upload it to Supabase Storage (max 5 MB). If you choose a file, it replaces the Image URL below. Leave both blank for no image.</p>
        <label>Image URL</label><input name="image_url" type="url" defaultValue={s.image_url || ''} />
        <p><SaveButton label="Update Service" /></p>
      </form>
    </>
  );
}
