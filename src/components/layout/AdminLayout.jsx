// src/components/layout/AdminLayout.jsx
// Estructura del panel: barra lateral fija en escritorio, desplegable en móvil.
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const items = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/ordenes', label: 'Órdenes' },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/usuarios', label: 'Usuarios' },
  { to: '/admin/reportes', label: 'Reportes' },
  { to: '/admin/perfil', label: 'Perfil' },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin min-vh-100 d-lg-flex">
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="d-flex align-items-center justify-content-between p-3">
          <Link to="/admin" className="d-flex align-items-center gap-2 text-decoration-none" onClick={() => setOpen(false)}>
            <img src="/imagenes/logo.webp" alt="F4A" height="30" />
            <span className="fw-bold text-white">Administración</span>
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-outline-light d-lg-none"
            aria-expanded={open}
            aria-controls="admin-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>
        <nav id="admin-menu" className={`px-2 pb-3 ${open ? 'd-block' : 'd-none d-lg-block'}`} aria-label="Administración">
          <ul className="nav flex-column gap-1">
            {items.map((i) => (
              <li key={i.to} className="nav-item">
                <NavLink to={i.to} end={i.end} className="nav-link" onClick={() => setOpen(false)}>{i.label}</NavLink>
              </li>
            ))}
          </ul>
          <hr className="border-secondary" />
          <div className="d-grid gap-2 px-2">
            <Link to="/" className="btn btn-outline-light btn-sm">Ver tienda</Link>
            <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </nav>
      </aside>
      <div className="admin-content flex-grow-1">
        <div className="admin-topbar px-3 px-md-4 py-2 small text-end">
          Sesión: <strong>{user?.email}</strong>
        </div>
        <main className="p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
