import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { SITE, whatsappLink } from '../data/site'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => String(p.id) === id)
  if (!product) {
    return (
      <div className="container">
        <h1 className="page-title">Product not found</h1>
        <p className="empty">This product is not available. <Link to="/products">Back to Products</Link></p>
      </div>
    )
  }
  return (
    <div className="container">
      <p className="breadcrumb"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}</p>
      <div className="detail-grid">
        <div>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ borderRadius: '14px', width: '100%' }} />
          ) : (
            <div className="service-img-placeholder" style={{ height: 300, borderRadius: '14px' }} aria-hidden="true">🖼️</div>
          )}
        </div>
        <div>
          <h1 style={{ color: 'var(--navy)', marginTop: 0 }}>{product.name}</h1>
          <p className="price">₹{product.price}</p>
          <h3>Description</h3>
          <p className="meta">{product.description || 'No description available.'}</p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/contact">Inquire / Order</Link>
            <a
              className="btn btn-teal"
              href={whatsappLink(`Hi, I'm interested in ${product.name} - ₹${product.price}`)}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <p className="meta" style={{ marginTop: '1rem' }}>
            Or call us directly: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
