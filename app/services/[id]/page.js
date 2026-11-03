export const revalidate = 300;
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarClock, FileText, MessageCircle, ArrowRight } from 'lucide-react';
import { getService } from '../../../lib/supabase';
import { serviceStatus, daysLeft, formatDate, whatsappLink } from '../../../lib/site';
import ServiceIcon from '../../../components/ServiceIcon';

export default async function ServiceDetail({ params }) {
  const s = await getService(params.id);
  if (!s) return notFound();
  const status = serviceStatus(s); const left = daysLeft(s);
  return (
    <>
      <p><a href="/services">← Back to Services</a></p>
      <div className="page-head">
        <span className="bento-icon"><ServiceIcon category={s.category} size={24} /></span>
        <h1 style={{ marginTop: '1rem' }}>{s.title}</h1>
        <p><span className="badge">{s.category}</span> <span className={`badge ${status}`}>{status}</span>{' '}
          {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">Last date in {left} day{left === 1 ? '' : 's'}</span>}</p>
      </div>
      {s.image_url && <div style={{ position: 'relative', height: 320, overflow: 'hidden', borderRadius: 20, marginBottom: '1.5rem' }}><Image src={s.image_url} alt={s.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 1160px" /></div>}
      <p style={{ fontSize: '1.05rem' }}>{s.full_description}</p>
      <div className="cards" style={{ margin: '2rem 0' }}>
        <div className="card"><span className="bento-icon"><CalendarClock size={24} aria-hidden="true" /></span><h3>Important Dates</h3><p>Start date: {formatDate(s.start_date)}<br />Last date: {formatDate(s.end_date)}</p></div>
        {s.required_documents && <div className="card"><span className="bento-icon"><FileText size={24} aria-hidden="true" /></span><h3>Required Documents</h3><p style={{ whiteSpace: 'pre-line' }}>{s.required_documents}</p></div>}
      </div>
      {s.eligibility && <><h2>Eligibility</h2><p style={{ whiteSpace: 'pre-line' }}>{s.eligibility}</p></>}
      <div className="hero-actions">
        {s.apply_link && <a className="btn outline" href={s.apply_link} target="_blank" rel="noopener">Official Apply Link</a>}
        <a className="btn" href={`/services/${s.id}/inquiry`}>Contact to Fill Form <ArrowRight size={18} aria-hidden="true" /></a>
        <a className="btn teal" href={whatsappLink(`Hello, I would like information about the "${s.title}" service.`)}><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
      </div>
      <div className="alert"><strong>Important Instructions:</strong> Before filling in a form, please read the official notification carefully. Giving incorrect information may lead to the form being rejected.</div>
    </>
  );
}
