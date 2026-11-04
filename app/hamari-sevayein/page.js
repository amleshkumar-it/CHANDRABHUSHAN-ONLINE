export const revalidate = 300;
import Image from 'next/image';
import { getShopServices, isSupabaseConfigured } from '../../lib/supabase';
import { SHOP_CATEGORIES, SITE, whatsappLink } from '../../lib/site';

export default async function HamariSevayeinPage() {
  const all = await getShopServices();
  const byCategory = SHOP_CATEGORIES.map((c) => ({ category: c, items: all.filter((s) => s.category === c) })).filter((g) => g.items.length > 0);
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Hamari Sevayein</span>
        <h1>Hamari Sevayein</h1>
        <p>Ye sarkari form ya job ki list nahi hai — ye wo kaam hain jo CHANDRABHUSHAN ONLINE ki dukaan par hote hain (Banking, Ayushman Card, Certificate). Har category ka apna alag section hai, Banking sabse pehle. Kisi seva ke liye WhatsApp par sampark karein. Open: {SITE.hours}.</p>
      </div>
      {!isSupabaseConfigured() && <p className="alert">The database is not connected yet, so no services are shown here.</p>}
      {byCategory.length === 0 ? <div className="empty"><strong>Abhi koi seva nahi hai.</strong><span>Jaldi wapas aayein!</span></div> : byCategory.map((g) => (
        <section key={g.category} id={g.category.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <h2>{g.category}</h2>
          <div className="cards">
            {g.items.map((s) => (
              <article className="card" key={s.id}>
                {s.image_url && <div style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: 8, marginBottom: '.75rem' }}><Image src={s.image_url} alt={s.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 50vw" /></div>}
                <h3>{s.title}</h3>
                {s.description && <p>{s.description}</p>}
                <p><a className="btn small" href={whatsappLink(`Hello, mujhe "${s.title}" seva ke baare me jaankari chahiye.`)}>WhatsApp par Sampark Karein</a></p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
