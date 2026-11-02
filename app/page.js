export const dynamic = 'force-dynamic';
import { getServices, isSupabaseConfigured } from '../lib/supabase';
import { SITE, serviceStatus, daysLeft, formatDate, whatsappLink } from '../lib/site';

export default async function Home() {
  const services = await getServices();
  const latest = services.slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">Trusted Online Service Centre</span>
          <h1>Government aur digital services, aasan aur surakshit tareeke se</h1>
          <p className="hero-lead">Hum aapki madad karte hain — government job form bharna, admit card download karna, result check karna, scholarship aur exam form bharna.</p>
          <ul className="hero-checks">
            <li>Government Job Form Apply</li>
            <li>Admit Card &amp; Result Download</li>
            <li>Scholarship &amp; Exam Forms</li>
            <li>Online Document Services</li>
          </ul>
          <div className="hero-actions">
            <a className="btn" href="/services">View All Services / सेवाएँ देखें</a>
            <a className="btn teal" href={whatsappLink('Namaste, mujhe service ke baare me jaankari chahiye.')}>WhatsApp par baat karein</a>
            <a className="btn outline" href="/contact">Contact Us</a>
          </div>
          <p className="muted">Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a> · WhatsApp: <a href={whatsappLink('Namaste, mujhe service ke baare me jaankari chahiye.')}>Chat karein</a></p>
        </div>
        <div className="hero-media">
          <img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" />
        </div>
      </section>

      <section className="trust" aria-label="Service information">
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">📞</span><div><strong>Call karein</strong><span><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span></div></div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">🕘</span><div><strong>Open timing</strong><span>{SITE.hours}</span></div></div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">🇮🇳</span><div><strong>PAN India</strong><span>Online services, kahi se bhi</span></div></div>
      </section>

      <section className="section">
        <h2>Hum kya karte hain</h2>
        <div className="cards">
          <div className="card"><h3>📄 Online Forms</h3><p>Government job forms, exam forms aur applications bharne me poori madad.</p></div>
          <div className="card"><h3>🛡️ Trusted Service</h3><p>Har kaam dhyaan se, sahi documents ke saath, aur time par.</p></div>
          <div className="card"><h3>🎧 Expert Support</h3><p>Phone, email aur WhatsApp par friendly support — {SITE.hours}.</p></div>
        </div>
      </section>

      <section className="section">
        <h2>Latest Services &amp; Updates</h2>
        {!isSupabaseConfigured() && <p className="alert">Database abhi connect nahi hai. Supabase set hone ke baad yahan latest services dikhengi.</p>}
        {latest.length === 0 ? (
          <div className="empty"><strong>No services yet.</strong><span>Check back soon!</span></div>
        ) : (
          <div className="cards">
            {latest.map((s) => {
              const status = serviceStatus(s); const left = daysLeft(s);
              return (
                <div className="card" key={s.id}>
                  <span className={`badge ${status}`}>{status}</span>{' '}
                  {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">⏰ Last date in {left} day{left === 1 ? '' : 's'} — {formatDate(s.end_date)}</span>}
                  <h3>{s.title}</h3><p className="muted">{s.short_description}</p>
                  <p><small>Last date: {formatDate(s.end_date)}</small></p>
                  <a className="btn small" href={`/services/${s.id}`}>View Details</a>
                </div>
              );
            })}
          </div>
        )}
        <p><a className="btn" href="/services">View All Services</a></p>
      </section>

      <section className="section">
        <h2>Kaise kaam hota hai?</h2>
        <div className="steps">
          <div className="step"><span className="step-num">1</span><h3>Service chunein</h3><p>Apni zaroorat ke hisab se service select karein.</p></div>
          <div className="step"><span className="step-num">2</span><h3>Inquiry form bharein ya WhatsApp karein</h3><p>Form bharein ya seedha WhatsApp par baat karein.</p></div>
          <div className="step"><span className="step-num">3</span><h3>Documents dein</h3><p>Documents dein, hum form bharne me madad karenge.</p></div>
        </div>
        <p className="muted">Note: Hum koi government department nahi hain. Hum ek local service centre hain jo online form bharne me madad karta hai.</p>
      </section>
    </>
  );
}
