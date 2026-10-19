// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'CLP', flag: '/imagenes/pago/chile.webp', name: 'Chile' },
    { code: 'USD', flag: '/imagenes/pago/eeuu.webp', name: 'EE.UU.' },
    { code: 'EUR', flag: '/imagenes/pago/euro.webp', name: 'Unión Europea' },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <header className="bg-dark text-white sticky-top border-bottom border-secondary shadow-sm">
      <div className="container py-2">
        <div className="row align-items-center g-2">
          
          {/* Logo F4A Oficial */}
          <div className="col-auto me-auto">
            <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
              <img 
                src="/imagenes/logo.webp" 
                alt="F4A Logo" 
                height="40" 
                className="me-2 object-fit-contain" 
              />
              <span className="text-light fs-6 fw-semibold text-nowrap d-none d-sm-inline">
                Tienda Digital
              </span>
            </Link>
          </div>

          <div className="col-lg-5 d-none d-lg-block">
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2 bg-dark text-light border-secondary"
                type="search"
                placeholder="Buscar juegos, licencias, suscripciones..."
              />
              <button className="btn btn-success fw-bold" type="submit">Buscar</button>
            </form>
          </div>

          {/* Monedas + Login + Carrito */}
          <div className="col-auto text-end d-flex align-items-center gap-2">
            
            <div className="dropdown me-1 position-relative">
              <button
                className="btn btn-dark btn-sm border-secondary dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={selectedCurrency.flag}
                  alt={selectedCurrency.name}
                  width="22"
                  height="15"
                  className="rounded-sm object-fit-cover"
                />
                <span className="fw-bold small text-light">{selectedCurrency.code}</span>
              </button>

              <ul className={`dropdown-menu dropdown-menu-dark shadow border-secondary position-absolute end-0 ${isOpen ? 'show' : ''}`}>
                {currencies.map((curr) => (
                  <li key={curr.code}>
                    <button
                      type="button"
                      className={`dropdown-item d-flex align-items-center gap-2 small ${
                        selectedCurrency.code === curr.code ? 'active bg-success' : ''
                      }`}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setIsOpen(false);
                      }}
                    >
                      <img
                        src={curr.flag}
                        alt={curr.name}
                        width="22"
                        height="15"
                        className="rounded-sm object-fit-cover"
                      />
                      <span>{curr.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/login" className="btn btn-sm btn-outline-light text-nowrap">
              Ingresar
            </Link>

            <Link to="/carrito" className="btn btn-sm btn-success position-relative">
              🛒
              {getCartCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Buscador para Móviles y Tablets (< 992px) */}
          <div className="col-12 d-lg-none mt-2">
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2 bg-dark text-light border-secondary"
                type="search"
                placeholder="Buscar juegos, licencias, suscripciones..."
              />
              <button className="btn btn-success fw-bold" type="submit">Buscar</button>
            </form>
          </div>

        </div>
      </div>

      {/* Menú de Categorías */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-top border-secondary py-1">
        <div className="container">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navCategorias"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navCategorias">
            <ul className="navbar-nav mx-auto text-uppercase fw-semibold small gap-md-3">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">INICIO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/categoria/gaming">JUEGOS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/categoria/software">SOFTWARE</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/categoria/subscripciones">SUSCRIPCIONES</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/categoria/regalos">TARJETAS REGALO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/categoria/randomkey">CLAVE ALEATORIA</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};