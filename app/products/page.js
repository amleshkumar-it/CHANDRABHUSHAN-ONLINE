export const revalidate = 60;
import { ArrowRight } from 'lucide-react';
import { getProducts, isSupabaseConfigured } from '../../lib/supabase';
export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <div className="page-head"><span className="eyebrow">Products</span><h1>Products</h1><p>Products available from CHANDRABHUSHAN ONLINE. Open any product for details and to enquire on WhatsApp.</p></div>
      {!isSupabaseConfigured() && <p className="alert">The database is not connected yet, so no products are shown here.</p>}
      {products.length === 0 ? <div className="empty"><strong>No products yet.</strong><span>Check back soon!</span></div> : (
        <div className="cards">
          {products.map((p) => (
            <div className="card" key={p.id}>
              {p.image_url && <img src={p.image_url} alt={p.name} loading="lazy" decoding="async" />}
              <h3>{p.name}</h3><p>{p.description}</p>
              {p.price != null && <p><strong>₹{p.price}</strong></p>}
              <a className="btn small outline" href={`/products/${p.id}`}>View Details <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
