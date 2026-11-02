export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser } from '../../../lib/supabase-server';
import { getProducts } from '../../../lib/supabase';
import { saveProduct, deleteProduct } from '../actions';
export default async function AdminProducts() {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  const products = await getProducts();
  return (
    <>
      <div className="page-head"><h1>Manage Products</h1></div><p><a href="/admin/dashboard">← Dashboard</a></p>
      <h2>Add New Product</h2>
      <form action={saveProduct} className="card">
        <label>Name *</label><input name="name" required />
        <label>Description</label><textarea name="description" rows={4} />
        <label>Price (₹)</label><input name="price" type="number" step="0.01" />
        <label>Image URL</label><input name="image_url" type="url" />
        <p><button className="btn" type="submit">Save Product</button></p>
      </form>
      <h2>Existing Products ({products.length})</h2>
      {products.map((p) => (
        <div className="card" key={p.id}><strong>{p.name}</strong>
          <p><a href={`/admin/products/${p.id}`}>Edit</a></p>
          <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><button className="btn danger small" type="submit">Delete</button></form>
        </div>
      ))}
    </>
  );
}
