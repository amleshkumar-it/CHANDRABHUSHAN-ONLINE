import { getProducts } from '../../lib/supabase';
export const dynamic = 'force-dynamic';
export default async function Gallery() {
  const products = await getProducts();
  return (
    <>
      <h1>Gallery</h1>
      <div className="cards">
        <div className="card"><img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE Shop" /><p>Our shop — CHANDRABHUSHAN ONLINE</p></div>
        {products.filter((p) => p.image_url).map((p) => (
          <div className="card" key={p.id}><a href={`/products/${p.id}`}><img src={p.image_url} alt={p.name} /></a><p>{p.name}</p></div>
        ))}
      </div>
      {products.length === 0 && <p className="muted">Product photos Supabase me add hone ke baad yahan dikhengi.</p>}
    </>
  );
}
