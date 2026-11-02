import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { MessageCircle, Search } from 'lucide-react';
import { SITE, whatsappLink } from '../lib/site';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'CHANDRABHUSHAN ONLINE — Online Service Centre',
  description: 'Government forms, jobs, admit cards, results and scholarships — help with online services from CHANDRABHUSHAN ONLINE.',
};

const navLink = 'text-white font-bold text-[0.95rem] px-4 py-3 whitespace-nowrap no-underline inline-flex items-center gap-1.5 hover:bg-navyLight hover:no-underline';
const footerLink = 'text-slate-200 no-underline hover:text-white hover:underline';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Apply the saved / preferred theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('cbo-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();" }} />
        <header id="top" className="bg-[var(--paper)] border-b border-[var(--line)] py-3.5">
          <div className="max-w-[1160px] mx-auto px-4 flex gap-6 items-center justify-between flex-wrap">
            <Link className="flex items-center gap-3 text-[var(--ink)] no-underline hover:no-underline" href="/">
              <span className="w-10 h-10 sm:w-12 sm:h-12 flex-none inline-flex items-center justify-center bg-tealBrand text-white rounded-lg text-xl sm:text-2xl font-extrabold" aria-hidden="true">C</span>
              <span className="flex flex-col leading-tight">
                <span className="text-[1.3rem] sm:text-[1.55rem] font-extrabold tracking-tight text-navy leading-none">CHANDRABHUSHAN <span className="text-tealBrand">ONLINE</span></span>
                <span className="text-xs sm:text-sm text-[var(--muted)] font-normal">{SITE.tagline}</span>
              </span>
            </Link>
            <div className="flex gap-3 items-center flex-wrap w-full lg:w-auto">
              <form className="flex items-center bg-[#eef1f5] border border-[var(--line)] rounded-full pl-3.5 pr-0.5 py-0.5 flex-1" action="/services" method="get" role="search">
                <label className="sr-only" htmlFor="site-search">Search services</label>
                <input className="border-0 bg-transparent min-w-0 flex-1 h-[38px] outline-none text-[var(--ink)]" id="site-search" type="search" name="q" placeholder="Search jobs, admit cards, results…" aria-label="Search services" />
                <button className="border-0 bg-tealBrand hover:bg-tealDark text-white rounded-full w-[38px] h-[38px] inline-flex items-center justify-center cursor-pointer flex-none" type="submit" aria-label="Search"><Search size={17} aria-hidden="true" /></button>
              </form>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <nav className="sticky top-0 z-40 bg-navy shadow-md" aria-label="Main navigation">
          <div className="max-w-[1160px] mx-auto px-4 flex overflow-x-auto">
            <Link href="/" className={`${navLink} bg-navyLight`}>Home</Link><Link href="/about" className={navLink}>About</Link><Link href="/services" className={navLink}>Services</Link>
            <Link href="/products" className={navLink}>Products</Link><Link href="/gallery" className={navLink}>Gallery</Link><Link href="/contact" className={navLink}>Contact</Link><Link href="/admin" className={navLink}>Admin</Link>
            <a className={`${navLink} ml-auto`} href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
          </div>
        </nav>
        <main className="wrap">{children}</main>
        <footer className="bg-navy text-slate-300 mt-12 pt-8">
          <p className="max-w-[1160px] mx-auto mb-6 px-4 text-slate-400 text-sm">CHANDRABHUSHAN ONLINE is an independent service centre and is not affiliated with any government department. Always verify information on the official website before applying.</p>
          <div className="max-w-[1160px] mx-auto px-4 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div>
              <p className="text-white text-lg font-extrabold">CHANDRABHUSHAN <span className="text-tealLight">ONLINE</span></p>
              <p>{SITE.tagline}</p>
              <p>Open: {SITE.hours}</p>
            </div>
            <div><h3 className="text-white text-base font-bold pb-1.5 border-b-2 border-tealBrand inline-block">Quick Links</h3><p><Link className={footerLink} href="/">Home</Link><br /><Link className={footerLink} href="/about">About</Link><br /><Link className={footerLink} href="/gallery">Gallery</Link><br /><Link className={footerLink} href="/contact">Contact</Link></p></div>
            <div><h3 className="text-white text-base font-bold pb-1.5 border-b-2 border-tealBrand inline-block">Services</h3><p><Link className={footerLink} href="/services">All Services</Link><br /><Link className={footerLink} href="/services?category=Job">Jobs</Link><br /><Link className={footerLink} href="/services?category=Admit%20Card">Admit Cards</Link><br /><Link className={footerLink} href="/services?category=Result">Results</Link><br /><Link className={footerLink} href="/products">Products</Link></p></div>
            <div><h3 className="text-white text-base font-bold pb-1.5 border-b-2 border-tealBrand inline-block">Contact</h3><p>Phone: <a className={footerLink} href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />Email: <a className={footerLink} href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a className={footerLink} href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p></div>
          </div>
          <p className="bg-[#060a13] mt-8 p-4 text-center text-slate-400 text-sm">© {new Date().getFullYear()} CHANDRABHUSHAN ONLINE. All rights reserved.</p>
        </footer>
        <a className="fixed right-3 bottom-[78px] sm:right-[18px] sm:bottom-[86px] bg-tealBrand hover:bg-tealDark text-white w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full flex items-center justify-center text-xl font-extrabold no-underline shadow-xl z-50" href="#top" aria-label="Back to top">↑</a>
        <a className="fixed right-3 bottom-3 sm:right-[18px] sm:bottom-[18px] bg-[#25d366] hover:scale-105 text-white w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full flex items-center justify-center no-underline shadow-xl z-50" href={whatsappLink('Hello, I would like information about online services.')} aria-label="Chat on WhatsApp"><MessageCircle size={28} aria-hidden="true" /></a>
      </body>
    </html>
  );
}
