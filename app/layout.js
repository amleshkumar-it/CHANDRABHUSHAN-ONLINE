import './globals.css';
import { SITE, NOTICE_ITEMS, whatsappLink } from '../lib/site';

export const metadata = {
  title: 'CHANDRABHUSHAN ONLINE — Online Service Centre',
  description: 'Government forms, jobs, admit cards, results and scholarships — help with online services from CHANDRABHUSHAN ONLINE.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="topbar">
          <span>📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span>
          <span>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
          <span>🕘 {SITE.hours}</span>
        </div>
        <header className="header">
          <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">C</span>CHANDRABHUSHAN <span>ONLINE</span></a>
          <nav className="nav">
            <a href="/">Home</a><a href="/about">About</a><a href="/services">Services / सेवाएँ</a>
            <a href="/products">Products</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a><a href="/admin">Admin</a>
          </nav>
        </header>
        <div className="notice" aria-label="Notices">
          {NOTICE_ITEMS.map((n) => <span key={n}>📢 {n}</span>)}
        </div>
        <main className="wrap">{children}</main>
        <footer className="footer">
          <div className="wrap">
            <div><h3>CHANDRABHUSHAN ONLINE</h3><p>{SITE.tagline}</p><p>Open: {SITE.hours}</p></div>
            <div><h3>Quick Links</h3><p><a href="/services">Services</a> · <a href="/products">Products</a> · <a href="/gallery">Gallery</a> · <a href="/contact">Contact</a></p></div>
            <div><h3>Contact / संपर्क</h3><p>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={whatsappLink('Namaste, mujhe online service ke baare me jaankari chahiye.')}>WhatsApp par baat karein</a></p></div>
          </div>
          <p className="footer-bottom">© {new Date().getFullYear()} CHANDRABHUSHAN ONLINE. All rights reserved.</p>
        </footer>
        <a className="wa" href={whatsappLink('Namaste, mujhe online service ke baare me jaankari chahiye.')} aria-label="Chat on WhatsApp">💬</a>
      </body>
    </html>
  );
}
