export const dynamic = 'force-dynamic';
import { redirect, notFound } from 'next/navigation';
import { getAdminUser } from '../../../../lib/supabase-server';
import { getProduct } from '../../../../lib/supabase';
import { saveProduct } from '../../actions';
export default async function EditProduct({ params }) {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  const p = await getProduct(params.id); if (!p) return notFound();
  return (
    <>
      <div className="page-head"><h1>Edit Product</h1></div><p><a href="/admin/products">← Back to Products</a></p>
      <form action={saveProduct} className="card" encType="multipart/form-data">
        <input type="hidden" name="id" value={p.id} />
        <label>Name *</label><input name="name" required defaultValue={p.name} />
        <label>Description</label><textarea name="description" rows={4} defaultValue={p.description || ''} />
        <label>Price (₹)</label><input name="price" type="number" step="0.01" defaultValue={p.price ?? ''} />
        <label>Upload Image (from your computer)</label><input name="image_file" type="file" accept="image/*" /><p className="muted">Choose a file to upload it to Supabase Storage (max 5 MB). If you choose a file, it replaces the Image URL below. Leave both blank for no image.</p>
        <label>Image URL</label><input name="image_url" type="url" defaultValue={p.image_url || ''} />
        <p><button className="btn" type="submit">Update Product</button></p>
      </form>
    </>
  );
}
