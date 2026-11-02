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
          <h1>Government and digital services, made easy and secure</h1>
          <p className="hero-lead">We help you with government job forms, admit card downloads, result checks, and scholarship and exam forms.</p>
          <ul className="hero-checks">
            <li>Government Job Form Apply</li>
            <li>Admit Card &amp; Result Download</li>
            <li>Scholarship &amp; Exam Forms</li>
            <li>Online Document Services</li>
          </ul>
          <div className="hero-actions">
            <a className="btn" href="/services">View All Services</a>
            <a className="btn teal" href={whatsappLink('Hello, I would like information about your services.')}>Chat on WhatsApp</a>
            <a className="btn outline" href="/contact">Contact Us</a>
          </div>
          <p className="muted">Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a> · WhatsApp: <a href={whatsappLink('Hello, I would like information about your services.')}>Chat now</a></p>
        </div>
        <div className="hero-media">
          <img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" />
        </div>
      </section>

      <section className="trust" aria-label="Service information">
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">📞</span><div><strong>Call us</strong><span><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span></div></div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">🕘</span><div><strong>Open hours</strong><span>{SITE.hours}</span></div></div>
        <div className="trust-item"><span className="trust-icon" aria-hidden="true">🇮🇳</span><div><strong>PAN India</strong><span>Online services, from anywhere</span></div></div>
      </section>

      <section className="section">
        <h2>What we do</h2>
        <div className="cards">
          <div className="card"><h3>📄 Online Forms</h3><p>Full help with government job forms, exam forms, and applications.</p></div>
          <div className="card"><h3>🛡️ Trusted Service</h3><p>Every job is done carefully, with the right documents, and on time.</p></div>
          <div className="card"><h3>🎧 Expert Support</h3><p>Friendly support by phone, email, and WhatsApp — {SITE.hours}.</p></div>
        </div>
      </section>

      <section className="section">
        <h2>Latest Services &amp; Updates</h2>
        {!isSupabaseConfigured() && <p className="alert">The database is not connected yet. The latest services will appear here once Supabase is set up.</p>}
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
        <h2>How does it work?</h2>
        <div className="steps">
          <div className="step"><span className="step-num">1</span><h3>Choose a service</h3><p>Select the service that matches your need.</p></div>
          <div className="step"><span className="step-num">2</span><h3>Fill in the inquiry form or WhatsApp us</h3><p>Fill in the form or chat with us directly on WhatsApp.</p></div>
          <div className="step"><span className="step-num">3</span><h3>Share your documents</h3><p>Share your documents and we will help you fill in the form.</p></div>
        </div>
        <p className="muted">Note: We are not a government department. We are a local service centre that helps you fill in online forms.</p>
      </section>
    </>
  );
}
