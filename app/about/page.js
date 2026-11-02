import { SITE } from '../../lib/site';
export default function About() {
  return (
    <>
      <h1>About Us</h1>
      <img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" style={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 14 }} />
      <p>CHANDRABHUSHAN ONLINE is a local online service centre. People often find government and digital work difficult online — how to fill in a form, which documents are needed, and when the last date is. That is exactly what we help with.</p>
      <h2>Why choose us?</h2>
      <ul><li>Work done with the correct information and the right documents</li><li>Explained in simple, plain language, so no step is missed</li><li>Support by phone, email, and WhatsApp — {SITE.hours}</li></ul>
      <p><a className="btn" href="/contact">Contact Us</a></p>
    </>
  );
}
