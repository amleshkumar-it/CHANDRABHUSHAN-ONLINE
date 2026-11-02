// HOW TO ADD A SERVICE
// --------------------
// 1. Copy one of the example objects in the comment below, paste it into
//    the `services` array, and fill in your own details.
// 2. Dates must be in YYYY-MM-DD format. The site automatically shows
//    Active (today is between start and end), Upcoming (starts in future)
//    or Expired (end date has passed).
// 3. `image` is optional. Put the image file in public/ and write its name
//    here, e.g. image: '/my-service-banner.jpg'. Leave it empty ('') for
//    no image.
// 4. `apply_link` is optional. Leave it empty ('') if there is no official link.
// 5. `required_documents` can be a list of lines separated by commas or
//    new lines, exactly as it was in the Django version.
//
// EXAMPLE (do not leave this uncommented unless you want it shown):
// {
//   id: 1,
//   title: 'Example Job Form',
//   category: 'Job', // Job | Admit Card | Form | Result | Scholarship
//   short_description: 'A short summary shown on cards (max about 300 characters).',
//   full_description: 'The full description shown on the service detail page.',
//   required_documents: 'Aadhaar Card, Passport photo, Signature',
//   eligibility: 'As per the official notification.',
//   start_date: '2026-11-01',
//   end_date: '2026-11-30',
//   apply_link: 'https://example.gov.in/apply',
//   image: '',
// },

export const SERVICE_CATEGORIES = ['Job', 'Admit Card', 'Form', 'Result', 'Scholarship']

// Currently empty on purpose: the old site's services lived in a database,
// and this static site has no database. Add services using the guide above.
export const services = []

export function serviceStatus(service) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(`${service.start_date}T00:00:00`)
  const end = new Date(`${service.end_date}T00:00:00`)
  if (today > end) return 'Expired'
  if (today >= start && today <= end) return 'Active'
  return 'Upcoming'
}

export function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
