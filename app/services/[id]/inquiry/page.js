export const dynamic = 'force-dynamic';
import { getService } from '../../../../lib/supabase';
import InquiryForm from '../../../../components/InquiryForm';
import { notFound } from 'next/navigation';
export default async function ServiceInquiry({ params }) {
  const s = await getService(params.id);
  if (!s) return notFound();
  return (<><div className="page-head"><span className="eyebrow">Inquiry</span><h1>Service Inquiry</h1><p>Service: <strong>{s.title}</strong> — fill in the form below and we will contact you by phone or WhatsApp.</p></div><InquiryForm serviceId={s.id} serviceTitle={s.title} /></>);
}
