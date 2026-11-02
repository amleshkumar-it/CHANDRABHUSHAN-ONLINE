'use client';
import { useFormState } from 'react-dom';
import { submitInquiry } from '../app/actions';
import { SITE, whatsappLink } from '../lib/site';

export default function InquiryForm({ serviceId, serviceTitle }) {
  const [state, action] = useFormState(submitInquiry, null);
  return (
    <form action={action} className="card">
      {serviceId && <input type="hidden" name="service_id" value={serviceId} />}
      {serviceTitle && <p>Service: <strong>{serviceTitle}</strong></p>}
      <label>Name / Naam *</label><input name="name" required placeholder="Your full name" />
      <label>Phone / Mobile Number *</label><input name="phone" required placeholder="10-digit mobile number" />
      <label>Email (optional)</label><input name="email" type="email" placeholder="you@example.com" />
      <label>Message / Sandesh *</label><textarea name="message" required rows={5} placeholder="Kis kaam me madad chahiye? Details likhein." />
      <p><button className="btn" type="submit">Submit Inquiry</button></p>
      {state?.error && <p className="alert" style={{ color: '#b42318' }}>{state.error}</p>}
      {state?.ok && <p className="alert" style={{ color: '#15803d' }}>{state.message}</p>}
      <p className="muted">Aapki inquiry database me save hogi (jab Supabase connected ho) aur admin panel me dikhegi. Turant baat ke liye: <a href={whatsappLink('Namaste, mujhe online service ke baare me jaankari chahiye.')}>WhatsApp: {SITE.whatsappNumber}</a></p>
    </form>
  );
}
