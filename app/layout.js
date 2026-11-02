import './globals.css';
import { Inter } from 'next/font/google';
import { Phone, Mail, Clock, MessageCircle, Search } from 'lucide-react';
import { SITE, whatsappLink } from '../lib/site';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'CHANDRABHUSHAN ONLINE — Online Service Centre',
  description: 'Government forms, jobs, admit cards, results and scholarships — help with online services from CHANDRABHUSHAN ONLINE.',
};

export default function RootLayout({ children }) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Apply the saved / preferred theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('cbo-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();" }} />
        <div className="topbar" id="top">
          <div className="topbar-inner">
            <span>{today}</span>
            <span><Clock size={13} aria-hidden="true" /> Open {SITE.hours}</span>
            <span><Phone size={13} aria-hidden="true" /> <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></span>
            <span><Mail size={13} aria-hidden="true" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
          </div>
        </div>
        <header className="header">
          <div className="header-inner">
            <a className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">C</span>
              <span className="brand-text">
                <span className="brand-title">CHANDRABHUSHAN <span>ONLINE</span></span>
                <span className="brand-sub">{SITE.tagline}</span>
              </span>
            </a>
            <div className="header-tools">
              <form className="header-search" action="/services" method="get" role="search">
                <label className="sr-only" htmlFor="site-search">Search services</label>
                <input id="site-search" type="search" name="q" placeholder="Search jobs, admit cards, results…" aria-label="Search services" />
                <button type="submit" aria-label="Search"><Search size={17} aria-hidden="true" /></button>
              </form>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="main-nav-inner">
            <a href="/" className="nav-home">Home</a><a href="/about">About</a><a href="/services">Services</a>
            <a href="/products">Products</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a><a href="/admin">Admin</a>
            <a className="nav-cta" href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
          </div>
        </nav>
        <main className="wrap">{children}</main>
        <footer className="footer">
          <p className="footer-disclaimer">CHANDRABHUSHAN ONLINE is an independent service centre and is not affiliated with any government department. Always verify information on the official website before applying.</p>
          <div className="wrap footer-grid">
            <div>
              <p className="footer-brand">CHANDRABHUSHAN <span>ONLINE</span></p>
              <p>{SITE.tagline}</p>
              <p>Open: {SITE.hours}</p>
            </div>
            <div><h3>Quick Links</h3><p><a href="/">Home</a><br /><a href="/about">About</a><br /><a href="/gallery">Gallery</a><br /><a href="/contact">Contact</a></p></div>
            <div><h3>Services</h3><p><a href="/services">All Services</a><br /><a href="/services?category=Job">Jobs</a><br /><a href="/services?category=Admit%20Card">Admit Cards</a><br /><a href="/services?category=Result">Results</a><br /><a href="/products">Products</a></p></div>
            <div><h3>Contact</h3><p>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p></div>
          </div>
          <p className="footer-bottom">© {new Date().getFullYear()} CHANDRABHUSHAN ONLINE. All rights reserved.</p>
        </footer>
        <a className="to-top" href="#top" aria-label="Back to top">↑</a>
        <a className="wa" href={whatsappLink('Hello, I would like information about online services.')} aria-label="Chat on WhatsApp"><MessageCircle size={28} aria-hidden="true" /></a>
      </body>
    </html>
  );
}
