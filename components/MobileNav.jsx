'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '../lib/site';

// Desktop nav stays exactly as before (horizontal links).
// On phones (below md) the links collapse into a hamburger menu.
const navLink = 'text-white font-bold text-[0.95rem] px-4 py-3 whitespace-nowrap no-underline inline-flex items-center gap-1.5 hover:bg-navyLight hover:no-underline';
const mobileLink = 'text-white font-bold text-base py-3 px-1 no-underline border-b border-white/10 last:border-b-0 inline-flex items-center gap-2';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className="sticky top-0 z-40 bg-navy shadow-md" aria-label="Main navigation">
      <div className="max-w-[1160px] mx-auto px-4 hidden md:flex overflow-x-auto">
        <Link href="/" className={`${navLink} bg-navyLight`}>Home</Link><Link href="/about" className={navLink}>About</Link><Link href="/services" className={navLink}>Services</Link>
        <Link href="/products" className={navLink}>Products</Link><Link href="/gallery" className={navLink}>Gallery</Link><Link href="/contact" className={navLink}>Contact</Link><Link href="/admin" className={navLink}>Admin</Link>
        <a className={`${navLink} ml-auto`} href={whatsappLink('Hello, I would like information about online services.')}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
      </div>
      <div className="md:hidden max-w-[1160px] mx-auto px-4 flex items-center justify-end py-1.5">
        <button
          type="button"
          className="text-white inline-flex items-center gap-2 font-bold text-base bg-transparent border-0 cursor-pointer py-1.5 px-1"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden max-w-[1160px] mx-auto px-4 pb-3 flex flex-col border-t border-white/10">
          <Link href="/" className={mobileLink} onClick={close}>Home</Link>
          <Link href="/about" className={mobileLink} onClick={close}>About</Link>
          <Link href="/services" className={mobileLink} onClick={close}>Services</Link>
          <Link href="/products" className={mobileLink} onClick={close}>Products</Link>
          <Link href="/gallery" className={mobileLink} onClick={close}>Gallery</Link>
          <Link href="/contact" className={mobileLink} onClick={close}>Contact</Link>
          <Link href="/admin" className={mobileLink} onClick={close}>Admin</Link>
          <a className={mobileLink} href={whatsappLink('Hello, I would like information about online services.')} onClick={close}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
        </div>
      )}
    </nav>
  );
}
