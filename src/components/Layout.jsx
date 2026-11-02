import { Link, NavLink, Outlet } from 'react-router-dom'
import { NOTICE_ITEMS, SITE, whatsappLink } from '../data/site'

export default function Layout() {
  const items = [...NOTICE_ITEMS, ...NOTICE_ITEMS]
  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <span>📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span>
          <span>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
          <span>🕘 {SITE.hours}</span>
          <span className="tagline">Trusted Online Service Center</span>
        </div>
      </div>

      <header className="header">
        <div className="header-inner">
          <Link className="brand" to="/">
            🏪 CHANDRABHUSHAN <span>ONLINE</span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/services">Services &amp; Updates</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <div className="notice" aria-hidden="true">
        <div className="notice-track">
          {items.map((item, i) => (
            <span key={i}>📢 {item}</span>
          ))}
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3>CHANDRABHUSHAN ONLINE</h3>
            <p>{SITE.tagline}</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Services &amp; Updates</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />
              ✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              🕘 {SITE.hours}</p>
          </div>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} CHANDRABHUSHAN ONLINE. All rights reserved.</p>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappLink('Hi, I need help with an online service.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  )
}
