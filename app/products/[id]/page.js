export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { getProduct } from '../../../lib/supabase';
import { SITE, whatsappLink } from '../../../lib/site';
export default async function ProductDetail({ params }) {
  const p = await getProduct(params.id);
  if (!p) return notFound();
  return (
    <>
      <p><a href="/products">← Back to Products</a></p>
      <h1>{p.name}</h1>
      {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 12 }} />}
      <p>{p.description}</p>
      {p.price != null && <p><strong>Price: ₹{p.price}</strong></p>}
      <p><a className="btn" href={whatsappLink(`Namaste, mujhe "${p.name}" product ke baare me jaankari chahiye.`)}>Enquire on WhatsApp</a> · Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></p>
    </>
  );
}
