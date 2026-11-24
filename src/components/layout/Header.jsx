// src/components/layout/Header.jsx
// Navegación de la tienda. El menú móvil y el desplegable de categorías se controlan
// con estado de React (no dependen del JavaScript de Bootstrap).
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categoryService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/ofertas', label: 'Ofertas' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blogs', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
];

export const Header = () => {
  const { count, total } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [term, setTerm] = useState('');
  const categories = categoryService.getAll();

  const close = () => {
    setMenuOpen(false);
    setCatOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos');
    setTerm('');
    close();
  };

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <header className="site-header sticky-top">
      <div className="container py-2 d-flex flex-wrap align-items-center gap-2 gap-lg-3">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none me-auto me-lg-0" onClick={close}>
          <img src="/imagenes/logo.webp" alt="F4A" height="36" />
          <span className="brand-name d-none d-sm-inline">Tienda Digital</span>
        </Link>

        <form className="d-flex flex-grow-1 order-last order-lg-0 search-form" role="search" onSubmit={handleSearch}>
          <label htmlFor="header-search" className="visually-hidden">Buscar productos</label>
          <input
            id="header-search"
            type="search"
            className="form-control"
            placeholder="Buscar juegos, licencias, suscripciones"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="btn btn-success ms-2" type="submit">Buscar</button>
        </form>

        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="btn btn-sm btn-outline-light" onClick={close}>Panel</Link>}
              <span className="small d-none d-md-inline text-secondary-emphasis">Hola, {user.nombre}</span>
              <button type="button" className="btn btn-sm btn-outline-light" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline-light" onClick={close}>Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-sm btn-light d-none d-sm-inline-block" onClick={close}>Crear cuenta</Link>
            </>
          )}
          <Link to="/carrito" className="btn btn-sm btn-success position-relative" onClick={close} aria-label={`Carrito, ${count} productos`}>
            Carrito {formatCLP(total)}
            {count > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger" data-testid="cart-count">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="d-lg-none btn btn-sm btn-outline-light"
            aria-controls="main-nav"
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </div>

      <nav className="main-nav border-top" aria-label="Principal">
        <div className="container">
          <ul id="main-nav" className={`nav flex-column flex-lg-row justify-content-lg-center py-1 ${menuOpen ? 'd-flex' : 'd-none d-lg-flex'}`}>
            {links.slice(0, 2).map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink to={l.to} end={l.end} className="nav-link" onClick={close}>{l.label}</NavLink>
              </li>
            ))}
            <li className="nav-item position-relative">
              <button
                type="button"
                className="nav-link dropdown-toggle bg-transparent border-0"
                aria-expanded={catOpen}
                onClick={() => setCatOpen((open) => !open)}
              >
                Categorías
              </button>
              <ul className={`dropdown-menu ${catOpen ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/categorias" onClick={close}>Todas las categorías</Link></li>
                <li><hr className="dropdown-divider" /></li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link className="dropdown-item" to={`/categorias/${c.id}`} onClick={close}>{c.nombre}</Link>
                  </li>
                ))}
              </ul>
            </li>
            {links.slice(2).map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink to={l.to} className="nav-link" onClick={close}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
