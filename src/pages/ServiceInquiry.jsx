import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { services } from '../data/services'
import { whatsappLink } from '../data/site'

export default function ServiceInquiry() {
  const { id } = useParams()
  const service = services.find((s) => String(s.id) === id)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const message = [
    'Hi, I want help filling a form.',
    service ? `Service: ${service.title} (${service.category})` : '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Message: ${form.message}`,
  ].filter(Boolean).join('\n')

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <p className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/services">Services &amp; Updates</Link>
        {service && <> / <Link to={`/services/${service.id}`}>{service.title}</Link></>} / Contact to Fill Form
      </p>
      <div className="card">
        <div className="card-body">
          <h1 style={{ color: 'var(--navy)', marginTop: 0 }}>Contact to Fill Form</h1>
          {service && (
            <p className="notice-box">
              <strong>Service:</strong> {service.title}<br />
              <strong>Category:</strong> {service.category}
            </p>
          )}
          <div className="notice-box">
            <strong>Please note:</strong> This is a static website with no database and no
            admin panel. Your inquiry is <strong>not saved</strong> on this site. When you
            press the button below, your details will open in WhatsApp so you can send them
            directly to the service center.
          </div>
          <p className="meta">Fill out the form below and we will contact you to help fill this form/service application.</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(whatsappLink(message), '_blank')
            }}
          >
            <label htmlFor="inq-name">Your Name *</label>
            <input id="inq-name" required value={form.name} onChange={update('name')} placeholder="Your full name" />
            <label htmlFor="inq-phone">Phone Number *</label>
            <input id="inq-phone" required value={form.phone} onChange={update('phone')} placeholder="Your phone number" />
            <label htmlFor="inq-email">Email Address *</label>
            <input id="inq-email" type="email" required value={form.email} onChange={update('email')} placeholder="Your email address" />
            <label htmlFor="inq-message">Message *</label>
            <textarea id="inq-message" required value={form.message} onChange={update('message')} placeholder="Tell us about your requirements or any questions." />
            <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: '1rem' }}>
              Send Inquiry on WhatsApp
            </button>
            {service && (
              <Link className="btn btn-outline btn-block" to={`/services/${service.id}`} style={{ marginTop: '0.5rem' }}>
                Back to Service Details
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
