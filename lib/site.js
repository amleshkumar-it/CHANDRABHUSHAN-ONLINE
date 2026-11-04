export const SITE = {
  name: 'CHANDRABHUSHAN ONLINE',
  shortName: 'CBO',
  phone: '7488578184',
  email: 'infochandrabhushan74@gmail.com',
  whatsappNumber: '917488578184',
  hours: '9 AM – 7 PM',
  tagline: 'Your trusted online service center for government forms, jobs, admit cards, and more.',
};
export const NOTICE_ITEMS = [
  'New Job Forms Available',
  'Admit Card Download Started',
  'Scholarship Applications Open',
  'Result Checking Service Available',
];
export const CATEGORIES = ['Job', 'Admit Card', 'Form', 'Result', 'Scholarship', 'Yojana'];
// Shop services shown on /hamari-sevayein. Banking is deliberately its own
// section, separate from the other shop services, at the owner's request.
export const SHOP_CATEGORIES = ['Banking', 'Ayushman Card', 'Certificate', 'Other'];
// Suggest a shop category from poster text (Hindi or English). Used by the
// admin poster form; the admin always confirms the category before saving,
// because OCR text is never 100% reliable.
export function suggestShopCategory(text) {
  const t = String(text || '').toLowerCase();
  if (t.includes('ayushman') || t.includes('आयुष्मान') || t.includes('pm-jay') || t.includes('pmjay')) return 'Ayushman Card';
  if (t.includes('bank') || t.includes('बैंक') || t.includes('khata') || t.includes('खाता') || t.includes('atm') || t.includes('paisa') || t.includes('पैसा') || t.includes('baroda') || t.includes('gramin') || t.includes('ग्रामीण')) return 'Banking';
  if (t.includes('jaati') || t.includes('जाति') || t.includes('aawasiya') || t.includes('आवासीय') || t.includes('aay') || t.includes('आय') || t.includes('ews') || t.includes('ncl') || t.includes('certificate') || t.includes('प्रमाण')) return 'Certificate';
  return 'Other';
}
/* Categories are shown in English only. */
export function whatsappLink(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export function serviceStatus(service) {
  if (!service.start_date || !service.end_date) return 'Upcoming';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(service.start_date); const end = new Date(service.end_date);
  if (today < start) return 'Upcoming';
  if (today > end) return 'Expired';
  return 'Active';
}
export function daysLeft(service) {
  if (!service.end_date) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const end = new Date(service.end_date);
  return Math.ceil((end - today) / 86400000);
}
export function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
