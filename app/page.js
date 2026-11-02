export const revalidate = 60;
import { ArrowRight, ShieldCheck, FileCheck, Clock, MessageCircle, Phone, Search, ClipboardList, Bell } from 'lucide-react';
import { getServices, isSupabaseConfigured } from '../lib/supabase';
import { SITE, CATEGORIES, serviceStatus, daysLeft, formatDate, whatsappLink } from '../lib/site';
import ServiceIcon from '../components/ServiceIcon';

function statusBadges(s) {
  const status = serviceStatus(s); const left = daysLeft(s);
  return (
    <span className="bento-meta">
      <span className={`badge ${status}`}>{status}</span>
      {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">Last date in {left} day{left === 1 ? '' : 's'} — {formatDate(s.end_date)}</span>}
      {s.end_date && <span className="badge">Last date: {formatDate(s.end_date)}</span>}
    </span>
  );
}

export default async function Home() {
  const services = await getServices();
  const byCategory = {};
  for (const s of services) { (byCategory[s.category] = byCategory[s.category] || []).push(s); }
  const presentCategories = Object.keys(byCategory);
  return (
    <>
      {/* ── Hero: full-bleed band, content on the shared 1280px grid ── */}
      <section className="hero reveal">
        <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow">Trusted Online Service Centre</span>
          <h1>Your Digital Services, Simplified.</h1>
          <p className="hero-lead">All your essential online services, government applications and digital assistance in one trusted place.</p>
          <div className="hero-actions">
            <a className="btn" href="/services">Explore Services <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="btn teal" href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={18} aria-hidden="true" /> Contact on WhatsApp</a>
          </div>
          <p className="muted">Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a> · Open: {SITE.hours}</p>
        </div>
        <div className="hero-dashboard" aria-label="Latest services">
          <div className="hero-dash-head">
            <span><strong>Latest services</strong><span>From our live services list</span></span>
            <span className="eyebrow">Live list</span>
          </div>
          {services.length === 0 ? (
            <p className="muted">No services yet. Check back soon!</p>
          ) : (
            <div className="hero-dash-rows">
              {services.slice(0, 4).map((s) => (
                <a className="hero-service-row" href={`/services/${s.id}`} key={s.id}>
                  <span className="hero-service-icon"><ServiceIcon category={s.category} size={22} /></span>
                  <span className="hero-service-text"><strong>{s.title}</strong><span>{s.category}</span></span>
                  <span className={`badge ${serviceStatus(s)}`}>{serviceStatus(s)}</span>
                </a>
              ))}
            </div>
          )}
          {services.length > 4 && <p className="muted" style={{ marginBottom: 0 }}><a href="/services">View all services</a></p>}
          <div className="hero-dash-info">
            <span><strong>CHANDRABHUSHAN ONLINE</strong><span>Open {SITE.hours} · Call <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span></span>
            <a className="btn small teal" href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
          </div>
        </div>
        </div>
      </section>

      {/* ── Latest Updates: portal-style columns, real services only ── */}
      <section className="section reveal reveal-1" aria-label="Latest Updates">
        <div className="section-head">
          <span className="eyebrow">Latest Updates</span>
          <h2>Latest Updates</h2>
          <p>New jobs, admit cards and results, grouped by category. Open any item for dates, documents and the official link.</p>
        </div>
        <div className="updates-grid">
          {[
            { cat: 'Job', label: 'Latest Jobs' },
            { cat: 'Admit Card', label: 'Admit Cards' },
            { cat: 'Result', label: 'Results' },
          ].map(({ cat, label }) => {
            const items = (byCategory[cat] || []).slice(0, 4);
            return (
              <article className="updates-col" key={cat}>
                <div className="updates-col-head">
                  <span className="bento-icon"><ServiceIcon category={cat} size={22} /></span>
                  <h3>{label}</h3>
                </div>
                {items.length === 0 ? (
                  <p className="muted">No updates yet. Check back soon!</p>
                ) : (
                  <ul className="updates-list">
                    {items.map((s) => (
                      <li key={s.id}>
                        <a href={`/services/${s.id}`}>{s.title}</a>
                        <span className="updates-meta">
                          <span className={`badge ${serviceStatus(s)}`}>{serviceStatus(s)}</span>
                          {s.end_date ? <span>Last date: {formatDate(s.end_date)}</span> : s.start_date ? <span>Start: {formatDate(s.start_date)}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p><a href={`/services?category=${encodeURIComponent(cat)}`}>View all {label} <ArrowRight size={16} aria-hidden="true" /></a></p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Category boxes: real categories, real counts only ── */}
      <section className="section reveal reveal-2" aria-label="Browse by category">
        <div className="section-head">
          <span className="eyebrow">Categories</span>
          <h2>Browse updates by category</h2>
          <p>Pick a category to see only those updates. The number shown is the number of live services in that category right now.</p>
        </div>
        <div className="category-boxes">
          {CATEGORIES.map((c) => {
            const count = (byCategory[c] || []).length;
            return (
              <a className="category-box" href={`/services?category=${encodeURIComponent(c)}`} key={c}>
                <span className="bento-icon"><ServiceIcon category={c} size={24} /></span>
                <strong>{c}</strong>
                <span>{count === 0 ? 'No updates yet' : `${count} service${count === 1 ? '' : 's'}`}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Services: premium Bento Grid, real data only ── */}
      <section className="section reveal reveal-2">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>Everything you need, in one place</h2>
          <p>Government job forms, admit cards, results and more — browse the latest services and open any card for full details.</p>
        </div>
        {!isSupabaseConfigured() && <p className="alert">The database is not connected yet. The latest services will appear here once Supabase is set up.</p>}
        {services.length === 0 ? (
          <div className="empty"><strong>No services yet.</strong><span>Check back soon!</span></div>
        ) : (
          <div className="bento">
            {services.map((s, i) => (
              <article className={`bento-card${i === 0 ? ' wide' : ''}`} key={s.id}>
                <span className="bento-icon"><ServiceIcon category={s.category} size={24} /></span>
                {statusBadges(s)}
                <h3>{s.title}</h3>
                <p>{s.short_description}</p>
                <a className="btn small outline" href={`/services/${s.id}`}>Explore Now <ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        )}
        <p style={{ marginTop: '1.5rem' }}><a className="btn" href="/services">View All Services</a></p>
      </section>

      {/* ── Trust strip ── */}
      <section className="trust reveal reveal-1" aria-label="Service information">
        <div className="trust-item"><span className="trust-icon"><Phone size={22} aria-hidden="true" /></span><div><strong>Call us</strong><span><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span></div></div>
        <div className="trust-item"><span className="trust-icon"><Clock size={22} aria-hidden="true" /></span><div><strong>Open hours</strong><span>{SITE.hours}</span></div></div>
        <div className="trust-item"><span className="trust-icon"><ShieldCheck size={22} aria-hidden="true" /></span><div><strong>Careful, honest help</strong><span>No false promises — just clear guidance</span></div></div>
      </section>

      {/* ── Why choose us ── */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Why choose us</span>
          <h2>Why choose CHANDRABHUSHAN ONLINE</h2>
          <p>Simple, careful help with online work — nothing hidden, nothing exaggerated.</p>
        </div>
        <div className="cards">
          <div className="card"><span className="bento-icon"><FileCheck size={24} aria-hidden="true" /></span><h3>Fast updates from official links</h3><p>Updates are shared with their official links, so you can check the source yourself before applying.</p></div>
          <div className="card"><span className="bento-icon"><Search size={24} aria-hidden="true" /></span><h3>Easy language, mobile-friendly</h3><p>Updates and guidance in plain, easy language, and this site works well on a mobile phone.</p></div>
          <div className="card"><span className="bento-icon"><ShieldCheck size={24} aria-hidden="true" /></span><h3>Free to browse updates</h3><p>Browsing updates on this site is free. If you take our help with a service, we will explain the process first.</p></div>
          <div className="card"><span className="bento-icon"><MessageCircle size={24} aria-hidden="true" /></span><h3>Phone &amp; WhatsApp support</h3><p>Reach us by phone, email or WhatsApp during open hours — {SITE.hours}.</p></div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three simple steps</h2>
        </div>
        <div className="steps">
          <div className="step"><span className="step-icon"><Search size={24} aria-hidden="true" /></span><span className="step-num">1</span><h3>Choose a service</h3><p>Browse the services list and open the one that matches your need. <a href="/services">Explore services</a>.</p></div>
          <div className="step"><span className="step-icon"><ClipboardList size={24} aria-hidden="true" /></span><span className="step-num">2</span><h3>Share your details and documents</h3><p>Fill in the inquiry form for that service, or message us on WhatsApp with your details.</p></div>
          <div className="step"><span className="step-icon"><Bell size={24} aria-hidden="true" /></span><span className="step-num">3</span><h3>Get help and updates</h3><p>We help you complete the form and stay in touch about admit cards, results and next steps.</p></div>
        </div>
        <p className="muted">Note: We are not a government department. We are a local service centre that helps you fill in online forms.</p>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Short, clear answers about how CHANDRABHUSHAN ONLINE works.</p>
        </div>
        <div className="faq">
          <div className="card"><h3>Is CHANDRABHUSHAN ONLINE a government website?</h3><p>No. CHANDRABHUSHAN ONLINE is an independent local service centre. It is not a government department and is not affiliated with any government department. Always verify information on the official website before applying.</p></div>
          <div className="card"><h3>How do I apply for a job or form through you?</h3><p>Open the job or form from the Services list, check its dates and official link, then use its inquiry form or message us on WhatsApp. We will guide you through the application steps and the documents needed.</p></div>
          <div className="card"><h3>How do I download an admit card or check a result?</h3><p>Open the admit card or result from the Services list and use its official link. If you need help, message us on WhatsApp and we will guide you through the steps.</p></div>
          <div className="card"><h3>Is browsing updates free?</h3><p>Yes. Browsing updates on this site is free. You can read the latest jobs, admit cards and results here without paying anything.</p></div>
          <div className="card"><h3>Do you guarantee a job or selection?</h3><p>No. No one can guarantee a job or selection. We only help you apply correctly and on time; the final decision is made by the recruiting body.</p></div>
        </div>
      </section>

      {/* ── Contact (real info + real flows, no fake form) ── */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Contact</span>
          <h2>Talk to us</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>CHANDRABHUSHAN ONLINE</h3>
            <p>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />Open: {SITE.hours}</p>
            <p><a className="btn teal" href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={18} aria-hidden="true" /> Contact on WhatsApp</a></p>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3>Send an inquiry</h3>
            <p>Use the inquiry form and we will contact you by phone or WhatsApp. For a specific service, open it and use its own inquiry form.</p>
            <p><a className="btn" href="/contact">Open Inquiry Form</a> <a className="btn outline" href="/services">Browse Services</a></p>
          </div>
        </div>
      </section>
      {/* ── Disclaimer ── */}
      <section className="disclaimer" aria-label="Disclaimer">
        <h2>Important Disclaimer</h2>
        <p>CHANDRABHUSHAN ONLINE is an independent service centre and is not affiliated with any government department. Information on this site comes from official links, but details can change — always verify on the official website before applying for any job, form, admit card or result. We do not guarantee any job or selection. Beware of fraud: do not pay anyone who asks for money in the name of a job, and do not share passwords or one-time codes with strangers.</p>
      </section>
    </>
  );
}
