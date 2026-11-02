import { useState } from 'react'
import { SITE, whatsappLink } from '../data/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })
  const message = [
    'Hi, I have a general inquiry.',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Message: ${form.message}`,
  ].join('\n')

  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-sub">Reach out for inquiries and assistance with online services.</p>
      <div className="detail-grid">
        <div className="card"><div className="card-body">
          <h3>📞 Phone</h3>
          <p><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></p>
          <hr />
          <h3>✉️ Email</h3>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <hr />
          <h3>💬 WhatsApp</h3>
          <p><a href={whatsappLink('Hi, I need help with an online service.')} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
          <hr />
          <h3>🕘 Hours</h3>
          <p className="meta">{SITE.hours}</p>
        </div></div>
        <div className="card"><div className="card-body">
          <h3 style={{ marginTop: 0 }}>Send Inquiry</h3>
          <div className="notice-box">
            This static site has no database, so inquiries are <strong>not saved</strong> here.
            Sending opens WhatsApp with your details pre-filled.
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(whatsappLink(message), '_blank')
            }}
          >
            <label htmlFor="c-name">Your Name *</label>
            <input id="c-name" required value={form.name} onChange={update('name')} />
            <label htmlFor="c-phone">Phone Number *</label>
            <input id="c-phone" required value={form.phone} onChange={update('phone')} />
            <label htmlFor="c-email">Email Address *</label>
            <input id="c-email" type="email" required value={form.email} onChange={update('email')} />
            <label htmlFor="c-message">Message *</label>
            <textarea id="c-message" required value={form.message} onChange={update('message')} />
            <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: '1rem' }}>
              Send Message on WhatsApp
            </button>
          </form>
        </div></div>
      </div>
    </div>
  )
}
