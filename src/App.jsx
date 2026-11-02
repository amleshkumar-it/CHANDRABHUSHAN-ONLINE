import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import ServiceInquiry from './pages/ServiceInquiry'

function NotFound() {
  return (
    <div className="container">
      <h1 className="page-title">Page not found</h1>
      <p className="empty">This page does not exist. Please use the navigation above.</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="services/:id/inquiry" element={<ServiceInquiry />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
