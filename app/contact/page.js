import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import InquiryForm from '../../components/InquiryForm';
import { SITE, whatsappLink } from '../../lib/site';
export default function Contact() {
  return (
    <>
      <div className="page-head"><span className="eyebrow">Contact</span><h1>Contact Us</h1><p>Reach us by phone, email or WhatsApp, or send an inquiry using the form below.</p></div>
      <div className="contact-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="contact-card">
          <h3>CHANDRABHUSHAN ONLINE</h3>
          <p><Phone size={16} aria-hidden="true" /> Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />
          <Mail size={16} aria-hidden="true" /> Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
          <Clock size={16} aria-hidden="true" /> Hours: {SITE.hours}<br />
          <MessageCircle size={16} aria-hidden="true" /> WhatsApp: <a href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3>Prefer WhatsApp?</h3>
          <p>For the fastest reply during open hours, message us directly on WhatsApp.</p>
          <p><a className="btn teal" href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p>
        </div>
      </div>
      <h2>General Inquiry Form</h2>
      <InquiryForm />
    </>
  );
}
