import { useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import { SERVICE_CATEGORIES, services } from '../data/services'

export default function Services() {
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? services : services.filter((s) => s.category === category)

  return (
    <div className="container">
      <h1 className="page-title">Services &amp; Latest Updates</h1>
      <p className="page-sub">Government Forms, Admit Cards, Jobs, Results, and More</p>

      <div className="filter-row" role="group" aria-label="Filter by category">
        <button className={`filter-btn ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>
          All
        </button>
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">
          No services available{category !== 'All' ? ` in this category` : ''}.
        </p>
      ) : (
        <div className="grid grid-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}
