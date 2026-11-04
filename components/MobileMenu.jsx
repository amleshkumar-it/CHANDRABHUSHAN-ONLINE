'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '../lib/site';

// Phones only (hidden from md up): just the hamburger icon, sitting in the
// header row opposite the logo. No separate navy strip on phones, no text.
// Tapping it opens the link list as a full-width row inside the header.
const mobileLink = 'text-white font-bold text-base py-3 px-3 no-underline border-b border-white/10 last:border-b-0 inline-flex items-center gap-2';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        className="md:hidden ml-auto inline-flex items-center justify-center w-11 h-11 text-navy dark:text-white bg-transparent border-0 cursor-pointer flex-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
      </button>
      {open && (
        <div className="md:hidden w-full bg-navy rounded-lg px-2 py-1 flex flex-col">
          <Link href="/" className={mobileLink} onClick={close}>Home</Link>
          <Link href="/services" className={mobileLink} onClick={close}>Sarkari Updates</Link>
          <Link href="/hamari-sevayein" className={mobileLink} onClick={close}>Hamari Sevayein</Link>
          <Link href="/about" className={mobileLink} onClick={close}>About</Link>
          <Link href="/products" className={mobileLink} onClick={close}>Products</Link>
          <Link href="/gallery" className={mobileLink} onClick={close}>Gallery</Link>
          <Link href="/contact" className={mobileLink} onClick={close}>Contact</Link>
          <Link href="/admin" className={mobileLink} onClick={close}>Admin</Link>
          <a className={mobileLink} href={whatsappLink('Hello, I would like information about online services.')} onClick={close}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
        </div>
      )}
    </>
  );
}
