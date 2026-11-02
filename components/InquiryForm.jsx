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
      <label>Name *</label><input name="name" required placeholder="Your full name" />
      <label>Phone / Mobile Number *</label><input name="phone" required placeholder="10-digit mobile number" />
      <label>Email (optional)</label><input name="email" type="email" placeholder="you@example.com" />
      <label>Message *</label><textarea name="message" required rows={5} placeholder="What do you need help with? Please give details." />
      <p><button className="btn" type="submit">Submit Inquiry</button></p>
      {state?.error && <p className="alert" style={{ color: '#b42318' }}>{state.error}</p>}
      {state?.ok && <p className="alert" style={{ color: '#15803d' }}>{state.message}</p>}
      <p className="muted">Your inquiry will be saved in the database (when Supabase is connected) and shown in the admin panel. For an immediate chat: <a href={whatsappLink('Hello, I would like information about online services.')}>WhatsApp: {SITE.whatsappNumber}</a></p>
    </form>
  );
}
