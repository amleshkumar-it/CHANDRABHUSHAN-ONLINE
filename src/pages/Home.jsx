import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'
import { SITE } from '../data/site'

const HIGHLIGHTS = [
  'Government Job Form Apply',
  'Admit Card & Result Download',
  'Scholarship & Exam Forms',
  'Online Document Services',
  'Fast Support & Guidance',
]

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>Trusted Online Service Center for Government &amp; Digital Services</h1>
          <p className="lead">
            We help you apply for government jobs, download admit cards, fill online forms,
            check results, and complete digital services easily and safely.
          </p>
          <ul className="checklist">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/services">View All Services</Link>
            <Link className="btn btn-outline" to="/contact">Contact Us</Link>
          </div>
        </div>
        <div>
          <img className="hero-img" src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE Shop" />
          <div className="card contact-card">
            <div className="card-body">
              <h3 style={{ marginTop: 0 }}>Quick Contact</h3>
              <p>
                📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />
                ✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <Link className="btn btn-primary btn-block" to="/contact">Contact to Fill Form</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <div className="grid grid-3">
          <div className="card"><div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📄</div>
            <h3>Online Forms</h3>
            <p className="meta">Government job forms, exam forms, and applications.</p>
          </div></div>
          <div className="card"><div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🛡️</div>
            <h3>Trusted Service</h3>
            <p className="meta">Reliable assistance for all your online service needs.</p>
          </div></div>
          <div className="card"><div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🎧</div>
            <h3>Expert Support</h3>
            <p className="meta">Friendly support via phone, email, and WhatsApp.</p>
          </div></div>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--navy)' }}>Latest Services &amp; Updates</h2>
        {services.length === 0 ? (
          <p className="empty">No services yet. Check back soon!</p>
        ) : (
          <>
            <div className="grid grid-3">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link className="btn btn-primary" to="/services">View All Services</Link>
            </p>
          </>
        )}
      </section>
    </div>
  )
}
