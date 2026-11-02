export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { getProduct } from '../../../lib/supabase';
import { SITE, whatsappLink } from '../../../lib/site';
export default async function ProductDetail({ params }) {
  const p = await getProduct(params.id);
  if (!p) return notFound();
  return (
    <>
      <p><a href="/products">← Back to Products</a></p>
      <div className="page-head"><h1>{p.name}</h1>{p.price != null && <p><strong>Price: ₹{p.price}</strong></p>}</div>
      {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 20, marginBottom: '1.5rem' }} />}
      <p>{p.description}</p>
      <p><a className="btn teal" href={whatsappLink(`Hello, I would like information about the "${p.name}" product.`)}><MessageCircle size={18} aria-hidden="true" /> Enquire on WhatsApp</a> · Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></p>
    </>
  );
}
