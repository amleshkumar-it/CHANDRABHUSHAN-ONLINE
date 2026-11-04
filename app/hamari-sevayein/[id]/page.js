export const revalidate = 300;
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { getShopService } from '../../../lib/supabase';
import { SITE, whatsappLink } from '../../../lib/site';
import PosterLightbox from '../../../components/PosterLightbox';

export default async function ShopServiceDetail({ params }) {
  const s = await getShopService(params.id);
  if (!s) return notFound();
  return (
    <>
      <p><a href="/hamari-sevayein">← Back to Hamari Sevayein</a></p>
      <div className="page-head">
        <span className="eyebrow">Hamari Sevayein</span>
        <h1>{s.title}</h1>
        <p><span className="badge">{s.category}</span></p>
      </div>
      {/* Full poster on this page; clicking opens the on-site popup. */}
      {s.image_url && <PosterLightbox imageUrl={s.image_url} title={s.title} variant="full" />}
      {s.image_url && <p className="muted" style={{ fontSize: '.85rem' }}>Click the poster to view it full size.</p>}
      {s.description && <p style={{ fontSize: '1.05rem', whiteSpace: 'pre-line' }}>{s.description}</p>}
      <div className="hero-actions">
        <a className="btn whatsapp-btn" href={whatsappLink(`Hello, I would like information about the "${s.title}" service.`)}><MessageCircle size={18} aria-hidden="true" /> Contact on WhatsApp</a>
        <a className="btn outline" href="/hamari-sevayein">Back to Hamari Sevayein</a>
      </div>
      <p className="muted">Open: {SITE.hours}. Visit the shop or contact us on WhatsApp for this service.</p>
    </>
  );
}
