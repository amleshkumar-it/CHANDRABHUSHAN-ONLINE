import { Link } from 'react-router-dom'
import { formatDate, serviceStatus } from '../data/services'

export default function ServiceCard({ service }) {
  const status = serviceStatus(service)
  const badgeClass =
    status === 'Active' ? 'badge-active' : status === 'Expired' ? 'badge-expired' : 'badge-upcoming'
  return (
    <article className="card service-card">
      {service.image ? (
        <img className="service-img" src={service.image} alt={service.title} />
      ) : (
        <div className="service-img-placeholder" aria-hidden="true">📄</div>
      )}
      <div className="card-body">
        <p style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span className="badge badge-cat">{service.category}</span>
          <span className={`badge ${badgeClass}`}>{status}</span>
        </p>
        <h3 style={{ marginTop: 0 }}>{service.title}</h3>
        <p className="meta">{service.short_description}</p>
        <p className="meta">
          Start: {formatDate(service.start_date)}<br />
          End: {formatDate(service.end_date)}
        </p>
        <Link className="btn btn-outline" to={`/services/${service.id}`}>View Details</Link>
      </div>
    </article>
  )
}
