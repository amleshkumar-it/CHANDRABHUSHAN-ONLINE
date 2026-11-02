import './globals.css';
import { Inter } from 'next/font/google';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE, NOTICE_ITEMS, whatsappLink } from '../lib/site';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'CHANDRABHUSHAN ONLINE — Online Service Centre',
  description: 'Government forms, jobs, admit cards, results and scholarships — help with online services from CHANDRABHUSHAN ONLINE.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Apply the saved / preferred theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('cbo-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();" }} />
        <div className="topbar">
          <div className="topbar-inner">
            <span><Phone size={14} aria-hidden="true" /> <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span>
            <span><Mail size={14} aria-hidden="true" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
            <span><Clock size={14} aria-hidden="true" /> {SITE.hours}</span>
          </div>
        </div>
        <header className="header">
          <div className="header-inner">
            <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">C</span>CHANDRABHUSHAN <span>ONLINE</span></a>
            <nav className="nav" aria-label="Main navigation">
              <a href="/">Home</a><a href="/about">About</a><a href="/services">Services</a>
              <a href="/products">Products</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a><a href="/admin">Admin</a>
            </nav>
            <span style={{ display: 'inline-flex', gap: '.5rem', alignItems: 'center' }}>
              <ThemeToggle />
              <a className="header-cta" href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a>
            </span>
          </div>
        </header>
        <div className="notice" aria-label="Notices">
          <div className="notice-inner">
            {NOTICE_ITEMS.map((n) => <span key={n}>📢 {n}</span>)}
          </div>
        </div>
        <main className="wrap">{children}</main>
        <footer className="footer">
          <div className="wrap">
            <div>
              <p className="footer-brand">CHANDRABHUSHAN <span>ONLINE</span></p>
              <p>{SITE.tagline}</p>
              <p>Open: {SITE.hours}</p>
              <p className="muted" style={{ color: '#b8c6d8' }}>We are not a government department. We are a local service centre that helps you fill in online forms.</p>
            </div>
            <div><h3>Quick Links</h3><p><a href="/">Home</a><br /><a href="/about">About</a><br /><a href="/gallery">Gallery</a><br /><a href="/contact">Contact</a></p></div>
            <div><h3>Services</h3><p><a href="/services">All Services</a><br /><a href="/services?category=Job">Jobs</a><br /><a href="/services?category=Admit%20Card">Admit Cards</a><br /><a href="/services?category=Result">Results</a><br /><a href="/products">Products</a></p></div>
            <div><h3>Contact</h3><p>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p></div>
          </div>
          <p className="footer-bottom">© {new Date().getFullYear()} CHANDRABHUSHAN ONLINE. All rights reserved.</p>
        </footer>
        <a className="wa" href={whatsappLink('Hello, I would like information about online services.')} aria-label="Chat on WhatsApp"><MessageCircle size={28} aria-hidden="true" /></a>
      </body>
    </html>
  );
}
