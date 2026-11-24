// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const pagos = ['webpay', 'paypal', 'mercadopago', 'visa', 'mastercard'];

export const Footer = () => (
  <footer className="site-footer mt-auto pt-5 pb-3">
    <div className="container">
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <img src="/imagenes/logo.webp" alt="F4A" height="40" className="mb-3" />
          <p className="small mb-0">
            Claves digitales de videojuegos, licencias de software, suscripciones y tarjetas de regalo con entrega inmediata.
          </p>
        </div>
        <div className="col-6 col-md-2">
          <h2 className="h6 fw-bold">Tienda</h2>
          <ul className="list-unstyled small">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/blogs">Blog</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md-3">
          <h2 className="h6 fw-bold">Información</h2>
          <ul className="list-unstyled small">
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/faqs">Preguntas frecuentes</Link></li>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/privacidad">Política de privacidad</Link></li>
          </ul>
        </div>
        <div className="col-12 col-md-3">
          <h2 className="h6 fw-bold">Medios de pago</h2>
          <div className="d-flex flex-wrap gap-2">
            {pagos.map((p) => (
              <img key={p} src={`/imagenes/pago/${p}.webp`} alt={p} height="26" className="bg-white rounded p-1" />
            ))}
          </div>
        </div>
      </div>
      <p className="small text-center border-top pt-3 mt-4 mb-0">
        © {new Date().getFullYear()} F4A Tienda Digital
      </p>
    </div>
  </footer>
);
