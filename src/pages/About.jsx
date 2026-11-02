import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="container">
      <h1 className="page-title">About CHANDRABHUSHAN ONLINE</h1>
      <img
        src="/shop.jpeg"
        alt="CHANDRABHUSHAN ONLINE Shop"
        style={{ borderRadius: '14px', maxHeight: '420px', width: '100%', objectFit: 'cover', margin: '1.5rem 0' }}
      />
      <h2>Our Story</h2>
      <p className="lead">
        CHANDRABHUSHAN ONLINE started with a simple goal: to bring quality online services
        and reliable assistance to our customers.
      </p>
      <p>
        Over the years we have built a reputation for trust and customer satisfaction. We
        specialize in helping customers with government forms, job applications, admit cards,
        scholarships, and various online services. We believe in transparent dealings and
        putting our customers first.
      </p>
      <div className="grid grid-3" style={{ marginTop: '1.5rem' }}>
        <div className="card"><div className="card-body">
          <h3>Owner</h3>
          <p className="meta">
            Our business is run with care and dedication. The owner is actively involved in
            ensuring every service request meets our standards and every customer receives
            reliable assistance.
          </p>
        </div></div>
        <div className="card"><div className="card-body">
          <h3>Trust &amp; Quality</h3>
          <p className="meta">
            We stand behind our services. Customer trust is our most valuable asset, and we
            work hard to maintain it through honest service, reliable assistance, and quality
            support for all your online service needs.
          </p>
        </div></div>
        <div className="card"><div className="card-body">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Trusted Service</li>
            <li>Expert Assistance</li>
            <li>Quick Support</li>
            <li>Reliable Help</li>
          </ul>
        </div></div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link className="btn btn-primary" to="/contact">Contact Us</Link>
      </p>
    </div>
  )
}
