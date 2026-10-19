// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export const Footer = () => {
  // Función para llevar la pantalla arriba al hacer clic en un enlace
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-100 bg-dark text-white border-top border-secondary pt-5 pb-3 mt-auto">
      <div className="container-fluid px-3 px-md-5">
        
        {/* LÍNEA SUPERIOR: Logo centrado con la imagen de fondo banner-footer */}
        <div 
          className="text-center mb-4 pb-4 pt-4 border-bottom border-secondary rounded position-relative overflow-hidden shadow-sm w-100"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/imagenes/banner-footer.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <img 
            src="/imagenes/logo.webp" 
            alt="F4A Logo" 
            height="55" 
            className="object-fit-contain position-relative" 
            style={{ zIndex: 2 }}
          />
        </div>

        {/* LÍNEA INFERIOR: Las 4 Columnas */}
        <div className="row g-4 text-center text-md-start">
          
          {/* COLUMNA 1: Tienda Digital */}
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold text-success mb-3">Tienda Digital</h6>
            <p className="small text-white opacity-75">
              Tu tienda de confianza para claves digitales de videojuegos, licencias de software, suscripciones y tarjetas de regalo al mejor precio.
            </p>
          </div>

          {/* COLUMNA 2: Información */}
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold text-success mb-3">Información</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/nosotros" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Sobre Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/quienes-somos" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Quiénes Somos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Contacto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faqs" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: Legal */}
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold text-success mb-3">Legal</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/terminos" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Términos y Condiciones
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacidad" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Política de Privacidad
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/politica-cookies" onClick={scrollToTop} className="text-white text-decoration-none fw-semibold link-hover-success">
                  • Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: Métodos de Pago */}
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold text-success mb-3">Métodos de Pago</h6>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-md-start">
              <img src="/imagenes/pago/webpay.webp" alt="Webpay" height="28" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
              <img src="/imagenes/pago/paypal.webp" alt="PayPal" height="28" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
              <img src="/imagenes/pago/mercadopago.webp" alt="MercadoPago" height="28" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
              <img src="/imagenes/pago/visa.webp" alt="Visa" height="28" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
              <img src="/imagenes/pago/mastercard.webp" alt="Mastercard" height="28" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
            </div>
          </div>

        </div>

        {/* Derechos de Autor */}
        <div className="border-top border-secondary mt-4 pt-3 text-center small text-white opacity-75">
          &copy; {new Date().getFullYear()} F4A Tienda Digital. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};