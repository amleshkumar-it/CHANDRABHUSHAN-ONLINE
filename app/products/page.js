export const dynamic = 'force-dynamic';
import { getProducts, isSupabaseConfigured } from '../../lib/supabase';
export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <h1>Products</h1>
      {!isSupabaseConfigured() && <p className="alert">Database abhi connect nahi hai, isliye koi product list nahi dikh rahi.</p>}
      {products.length === 0 ? <p>No products yet. Check back soon!</p> : (
        <div className="cards">
          {products.map((p) => (
            <div className="card" key={p.id}>
              {p.image_url && <img src={p.image_url} alt={p.name} />}
              <h3>{p.name}</h3><p className="muted">{p.description}</p>
              {p.price != null && <p><strong>₹{p.price}</strong></p>}
              <a className="btn small" href={`/products/${p.id}`}>View Details</a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
