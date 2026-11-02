import { Link, useParams } from 'react-router-dom'
import { formatDate, services, serviceStatus } from '../data/services'

export default function ServiceDetail() {
  const { id } = useParams()
  const service = services.find((s) => String(s.id) === id)
  if (!service) {
    return (
      <div className="container">
        <h1 className="page-title">Service not found</h1>
        <p className="empty">This service is not available. <Link to="/services">Back to Services</Link></p>
      </div>
    )
  }
  const status = serviceStatus(service)
  const badgeClass =
    status === 'Active' ? 'badge-active' : status === 'Expired' ? 'badge-expired' : 'badge-upcoming'
  const documents = service.required_documents
    ? service.required_documents.split(/[\n,]+/).map((d) => d.trim()).filter(Boolean)
    : []

  return (
    <div className="container">
      <p className="breadcrumb"><Link to="/">Home</Link> / <Link to="/services">Services &amp; Updates</Link> / {service.title}</p>
      <div className="detail-grid">
        <div className="card">
          {service.image && <img className="service-img" src={service.image} alt={service.title} style={{ height: 320 }} />}
          <div className="card-body">
            <p style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
              <span className="badge badge-cat">{service.category}</span>
              <span className={`badge ${badgeClass}`}>{status}</span>
            </p>
            <h1 style={{ color: 'var(--navy)' }}>{service.title}</h1>
            <p className="lead">{service.short_description}</p>
            <hr />
            <h3>Full Description</h3>
            <p className="meta" style={{ whiteSpace: 'pre-line' }}>{service.full_description}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1.25rem', alignContent: 'start' }}>
          <div className="card"><div className="card-body">
            <h3 style={{ marginTop: 0 }}>📅 Important Dates</h3>
            <p><strong>Start Date:</strong><br />{formatDate(service.start_date)}</p>
            <p><strong>Last Date:</strong><br />{formatDate(service.end_date)}</p>
            {status === 'Expired' && <p className="notice-box">This service has expired.</p>}
            {status === 'Active' && <p className="notice-box">Currently accepting applications.</p>}
          </div></div>
          <div className="card"><div className="card-body">
            <h3 style={{ marginTop: 0 }}>📄 Required Documents</h3>
            {documents.length > 0 ? (
              <ul>{documents.map((doc) => <li key={doc}>{doc}</li>)}</ul>
            ) : (
              <p className="meta">No documents listed for this service.</p>
            )}
          </div></div>
          {service.eligibility && (
            <div className="card"><div className="card-body">
              <h3 style={{ marginTop: 0 }}>✅ Eligibility</h3>
              <p className="meta" style={{ whiteSpace: 'pre-line' }}>{service.eligibility}</p>
            </div></div>
          )}
          {service.apply_link && (
            <a className="btn btn-teal btn-block" href={service.apply_link} target="_blank" rel="noreferrer">
              Official Apply Link ↗
            </a>
          )}
          <Link className="btn btn-primary btn-block" to={`/services/${service.id}/inquiry`}>
            Contact to Fill Form
          </Link>
        </div>
      </div>
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-body">
          <h3 style={{ marginTop: 0 }}>⚠️ Important Instructions</h3>
          <ul>
            <li>Please read all details carefully before applying.</li>
            <li>Ensure you have all required documents ready.</li>
            <li>Submit your application before the last date.</li>
            <li>Keep a copy of your submitted application for reference.</li>
            <li>For any queries, contact us via phone or WhatsApp.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
