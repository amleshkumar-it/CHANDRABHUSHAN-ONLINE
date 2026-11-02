import Image from 'next/image';
import { ShieldCheck, FileCheck, MessageCircle } from 'lucide-react';
import { SITE } from '../../lib/site';
export default function About() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">About Us</span>
        <h1>About CHANDRABHUSHAN ONLINE</h1>
        <p>A local online service centre that makes government and digital work easier to understand and complete.</p>
      </div>
      <div className="hero-media" style={{ padding: 0, marginBottom: '2rem' }}>
        <div style={{ position: 'relative', height: 380, overflow: 'hidden', borderRadius: 20 }}><Image src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 1160px" priority /></div>
      </div>
      <p>CHANDRABHUSHAN ONLINE is a local online service centre. People often find government and digital work difficult online — how to fill in a form, which documents are needed, and when the last date is. That is exactly what we help with.</p>
      <section className="section">
        <div className="section-head"><span className="eyebrow">Why choose us?</span><h2>Clear help, step by step</h2></div>
        <div className="cards">
          <div className="card"><span className="bento-icon"><FileCheck size={24} aria-hidden="true" /></span><h3>Correct information</h3><p>Work done with the correct information and the right documents.</p></div>
          <div className="card"><span className="bento-icon"><ShieldCheck size={24} aria-hidden="true" /></span><h3>Plain language</h3><p>Explained in simple, plain language, so no step is missed.</p></div>
          <div className="card"><span className="bento-icon"><MessageCircle size={24} aria-hidden="true" /></span><h3>Real support</h3><p>Support by phone, email, and WhatsApp — {SITE.hours}.</p></div>
        </div>
      </section>
      <p><a className="btn" href="/contact">Contact Us</a></p>
    </>
  );
}
