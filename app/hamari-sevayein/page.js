export const revalidate = 300;
import { getShopServices, isSupabaseConfigured } from '../../lib/supabase';
import { SHOP_CATEGORIES, SITE, whatsappLink } from '../../lib/site';
import PosterLightbox from '../../components/PosterLightbox';

export default async function HamariSevayeinPage() {
  const all = await getShopServices();
  const byCategory = SHOP_CATEGORIES.map((c) => ({ category: c, items: all.filter((s) => s.category === c) })).filter((g) => g.items.length > 0);
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Hamari Sevayein</span>
        <h1>Hamari Sevayein</h1>
        <p>This is not a list of government forms or jobs — these are the services available at the CHANDRABHUSHAN ONLINE shop (Banking, Ayushman Card, Certificate). Each category has its own section, with Banking first. Contact us on WhatsApp for any service. Open: {SITE.hours}.</p>
      </div>
      {!isSupabaseConfigured() && <p className="alert">The database is not connected yet, so no services are shown here.</p>}
      {byCategory.length === 0 ? <div className="empty"><strong>No services yet.</strong><span>Check back soon!</span></div> : byCategory.map((g) => (
        <section key={g.category} id={g.category.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <h2>{g.category}</h2>
          <div className="cards shop-cards">
            {g.items.map((s) => (
              <article className="card" key={s.id}>
                {/* One-size square tile whatever shape was uploaded; clicking
                    opens the full poster in an on-site popup. */}
                {s.image_url && <PosterLightbox imageUrl={s.image_url} title={s.title} variant="tile" />}
                {s.image_url && <p className="muted" style={{ fontSize: '.85rem' }}>Click the poster to view it full size.</p>}
                <h3>{s.title}</h3>
                {s.description && <p>{s.description}</p>}
                <p style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                  <a className="btn small" href={`/hamari-sevayein/${s.id}`}>View Details</a>
                  <a className="btn small whatsapp-btn" href={whatsappLink(`Hello, I would like information about the "${s.title}" service.`)}>Contact on WhatsApp</a>
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
