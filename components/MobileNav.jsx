import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../lib/site';

// Desktop nav only: on phones this bar is hidden entirely, the hamburger
// icon lives in the header instead (see MobileMenu).
const navLink = 'text-white font-bold text-[0.95rem] px-4 py-3 whitespace-nowrap no-underline inline-flex items-center gap-1.5 hover:bg-navyLight hover:no-underline';

export default function MobileNav() {
  return (
    <nav className="sticky top-0 z-40 bg-navy shadow-md hidden md:block" aria-label="Main navigation">
      <div className="max-w-[1160px] mx-auto px-4 flex overflow-x-auto">
        <Link href="/" className={`${navLink} bg-navyLight`}>Home</Link><Link href="/services?category=Yojana" className={navLink}>Sarkari Yojana</Link><Link href="/services?category=Job" className={navLink}>Sarkari Jobs</Link><Link href="/about" className={navLink}>About</Link><Link href="/services" className={navLink}>Services</Link>
        <Link href="/products" className={navLink}>Products</Link><Link href="/gallery" className={navLink}>Gallery</Link><Link href="/contact" className={navLink}>Contact</Link><Link href="/admin" className={navLink}>Admin</Link>
        <a className={`${navLink} ml-auto`} href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
      </div>
    </nav>
  );
}
