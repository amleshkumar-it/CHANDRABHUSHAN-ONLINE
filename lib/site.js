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
export const CATEGORIES = ['Job', 'Admit Card', 'Form', 'Result', 'Scholarship'];
export const CATEGORY_HINDI = {
  Job: 'नौकरी फॉर्म',
  'Admit Card': 'एडमिट कार्ड',
  Form: 'ऑनलाइन फॉर्म',
  Result: 'रिज़ल्ट',
  Scholarship: 'छात्रवृत्ति',
};
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
