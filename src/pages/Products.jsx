import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Products() {
  return (
    <div className="container">
      <h1 className="page-title">Our Products &amp; Services</h1>
      <p className="page-sub">Browse our range of quality products and services.</p>
      {products.length === 0 ? (
        <p className="empty">No products available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-3">
          {products.map((product) => (
            <article className="card service-card" key={product.id}>
              {product.image ? (
                <img className="service-img" src={product.image} alt={product.name} />
              ) : (
                <div className="service-img-placeholder" aria-hidden="true">🖼️</div>
              )}
              <div className="card-body">
                <h3 style={{ marginTop: 0 }}>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <p className="meta">{product.description}</p>
                <Link className="btn btn-outline" to={`/products/${product.id}`}>View Details</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
