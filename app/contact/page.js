import InquiryForm from '../../components/InquiryForm';
import { SITE, whatsappLink } from '../../lib/site';
export default function Contact() {
  return (
    <>
      <h1>Contact Us</h1>
      <div className="card">
        <p><strong>Phone:</strong> <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />
        <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        <strong>Hours:</strong> {SITE.hours}<br />
        <strong>WhatsApp:</strong> <a href={whatsappLink('Hello, I would like information about online services.')}>Chat on WhatsApp</a></p>
      </div>
      <h2>General Inquiry Form</h2>
      <InquiryForm />
    </>
  );
}
