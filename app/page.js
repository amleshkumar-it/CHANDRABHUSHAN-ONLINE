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
          <p style={{ color: '#e87722', fontWeight: 800 }}>Trusted Online Service Centre</p>
          <h1>Government aur digital services, aasan aur surakshit tareeke se</h1>
          <p>Hum aapki madad karte hain — government job form bharna, admit card download karna, result check karna, scholarship aur exam form bharna.</p>
          <p>✔️ Government Job Form Apply &nbsp; ✔️ Admit Card &amp; Result Download<br />✔️ Scholarship &amp; Exam Forms &nbsp; ✔️ Online Document Services</p>
          <p><a className="btn" href="/services">View All Services / सेवाएँ देखें</a> &nbsp; <a className="btn outline" href="/contact">Contact Us</a></p>
          <p className="muted">Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a> · WhatsApp: <a href={whatsappLink('Namaste, mujhe service ke baare me jaankari chahiye.')}>Chat karein</a></p>
        </div>
        <img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" />
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
          <p>No services yet. Check back soon!</p>
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

      <section className="section card">
        <h2>Kaise kaam hota hai?</h2>
        <p><strong>1.</strong> Service chunein &nbsp; <strong>2.</strong> Inquiry form bharein ya WhatsApp karein &nbsp; <strong>3.</strong> Documents dein, hum form bharne me madad karenge.</p>
        <p className="muted">Note: Hum koi government department nahi hain. Hum ek local service centre hain jo online form bharne me madad karta hai.</p>
      </section>
    </>
  );
}
