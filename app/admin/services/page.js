export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser } from '../../../lib/supabase-server';
import { getServices } from '../../../lib/supabase';
import { saveService, deleteService } from '../actions';
import { CATEGORIES } from '../../../lib/site';
export default async function AdminServices() {
  const user = await getAdminUser(); if (!user) redirect('/admin');
  const services = await getServices();
  return (
    <>
      <h1>Manage Services</h1><p><a href="/admin/dashboard">← Dashboard</a></p>
      <h2>Add New Service</h2>
      <form action={saveService} className="card">
        <label>Title *</label><input name="title" required />
        <label>Category *</label><select name="category" required>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        <label>Short Description</label><textarea name="short_description" rows={3} />
        <label>Full Description</label><textarea name="full_description" rows={6} />
        <label>Required Documents</label><textarea name="required_documents" rows={4} />
        <label>Eligibility</label><textarea name="eligibility" rows={3} />
        <label>Start Date</label><input name="start_date" type="date" />
        <label>End Date</label><input name="end_date" type="date" />
        <label>Official Apply Link</label><input name="apply_link" type="url" />
        <label>Image URL</label><input name="image_url" type="url" placeholder="https://... (Supabase Storage URL, or leave blank)" />
        <p><button className="btn" type="submit">Save Service</button></p>
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
