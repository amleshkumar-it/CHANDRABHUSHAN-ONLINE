export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { getService } from '../../../lib/supabase';
import { serviceStatus, daysLeft, formatDate, whatsappLink } from '../../../lib/site';

export default async function ServiceDetail({ params }) {
  const s = await getService(params.id);
  if (!s) return notFound();
  const status = serviceStatus(s); const left = daysLeft(s);
  return (
    <>
      <p><a href="/services">← Back to Services</a></p>
      <h1>{s.title}</h1>
      <p><span className="badge">{s.category}</span> <span className={`badge ${status}`}>{status}</span>{' '}
        {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">⏰ Last date in {left} day{left === 1 ? '' : 's'}</span>}</p>
      {s.image_url && <img src={s.image_url} alt={s.title} style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 12 }} />}
      <p>{s.full_description}</p>
      <h2>Important Dates</h2><p>Start date: {formatDate(s.start_date)}<br />Last date: {formatDate(s.end_date)}</p>
      {s.required_documents && <><h2>Required Documents</h2><p style={{ whiteSpace: 'pre-line' }}>{s.required_documents}</p></>}
      {s.eligibility && <><h2>Eligibility</h2><p style={{ whiteSpace: 'pre-line' }}>{s.eligibility}</p></>}
      <p>
        {s.apply_link && <a className="btn outline" href={s.apply_link} target="_blank" rel="noopener">Official Apply Link</a>}{' '}
        <a className="btn" href={`/services/${s.id}/inquiry`}>Contact to Fill Form</a>{' '}
        <a className="btn teal" href={whatsappLink(`Hello, I would like information about the "${s.title}" service.`)}>WhatsApp</a>
      </p>
      <div className="alert"><strong>Important Instructions:</strong> Before filling in a form, please read the official notification carefully. Giving incorrect information may lead to the form being rejected.</div>
    </>
  );
}
