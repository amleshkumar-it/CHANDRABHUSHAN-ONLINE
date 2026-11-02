// Contact details copied from the original Django site (base/contact templates).
// Edit these values here if the shop's phone, email or hours change.
export const SITE = {
  name: 'CHANDRABHUSHAN ONLINE',
  shortName: 'CBO',
  phone: '7488578184',
  email: 'infochandrabhushan74@gmail.com',
  whatsappNumber: '917488578184',
  hours: '9 AM – 7 PM',
  tagline: 'Your trusted online service center for government forms, jobs, admit cards, and more.',
}

export const NOTICE_ITEMS = [
  'New Job Forms Available',
  'Admit Card Download Started',
  'Scholarship Applications Open',
  'Result Checking Service Available',
]

export function whatsappLink(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}
