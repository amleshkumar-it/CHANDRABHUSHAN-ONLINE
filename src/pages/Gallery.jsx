import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Gallery() {
  const withImages = products.filter((p) => p.image)
  return (
    <div className="container">
      <h1 className="page-title">Gallery</h1>
      <p className="page-sub">Our service center and service highlights.</p>
      <div className="grid grid-3">
        <figure className="card" style={{ margin: 0 }}>
          <img className="service-img" src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE Shop" style={{ height: 250 }} />
          <figcaption className="card-body"><strong>CHANDRABHUSHAN ONLINE Shop</strong></figcaption>
        </figure>
        {withImages.map((product) => (
          <figure className="card" style={{ margin: 0 }} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="service-img" src={product.image} alt={product.name} style={{ height: 250 }} />
            </Link>
            <figcaption className="card-body">{product.name}</figcaption>
          </figure>
        ))}
      </div>
      {withImages.length === 0 && (
        <p className="empty">More images coming soon.</p>
      )}
    </div>
  )
}
