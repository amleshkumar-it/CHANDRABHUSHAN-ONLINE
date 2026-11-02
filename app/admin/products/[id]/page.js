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
      <h1>Edit Product</h1><p><a href="/admin/products">← Back to Products</a></p>
      <form action={saveProduct} className="card">
        <input type="hidden" name="id" value={p.id} />
        <label>Name *</label><input name="name" required defaultValue={p.name} />
        <label>Description</label><textarea name="description" rows={4} defaultValue={p.description || ''} />
        <label>Price (₹)</label><input name="price" type="number" step="0.01" defaultValue={p.price ?? ''} />
        <label>Image URL</label><input name="image_url" type="url" defaultValue={p.image_url || ''} />
        <p><button className="btn" type="submit">Update Product</button></p>
      </form>
    </>
  );
}
