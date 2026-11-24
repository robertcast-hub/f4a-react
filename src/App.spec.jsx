// Pruebas de integración de rutas: cada vista del diagrama de navegación responde
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { authService } from './data/dataService';
import { mockAdmin } from './test/renderWithProviders';

const renderAt = (route) => render(
  <MemoryRouter initialEntries={[route]}>
    <AuthProvider><CartProvider><App /></CartProvider></AuthProvider>
  </MemoryRouter>,
);

describe('App (rutas)', () => {
  const tienda = [
    ['/', 'Categorías'],
    ['/productos', 'Productos'],
    ['/producto/P001', 'Final Fantasy VII Remake Intergrade'],
    ['/categorias', 'Categorías'],
    ['/categorias/software', 'Software'],
    ['/ofertas', 'Ofertas'],
    ['/carrito', 'Tu carrito está vacío'],
    ['/login', 'Iniciar sesión'],
    ['/registro', 'Crear cuenta'],
    ['/nosotros', 'Nosotros'],
    ['/blogs', 'Blog'],
    ['/blogs/guia-gta6', 'GTA VI: lo que sabemos antes del lanzamiento'],
    ['/contacto', 'Contacto'],
    ['/faqs', 'Preguntas frecuentes'],
    ['/ruta-que-no-existe', 'Página no encontrada'],
  ];

  tienda.forEach(([route, heading]) => {
    it(`la ruta ${route} muestra "${heading}"`, () => {
      renderAt(route);
      expect(screen.getAllByRole('heading', { name: heading }).length).toBeGreaterThan(0);
    });
  });

  it('/admin sin sesión redirige al formulario de login', () => {
    renderAt('/admin');
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy();
  });

  const admin = [
    ['/admin', 'Dashboard'],
    ['/admin/ordenes', 'Órdenes y boletas'],
    ['/admin/ordenes/ORD-20260001', 'Boleta ORD-20260001'],
    ['/admin/productos', 'Productos'],
    ['/admin/productos/nuevo', 'Nuevo producto'],
    ['/admin/productos/P001', 'Final Fantasy VII Remake Intergrade'],
    ['/admin/productos/P001/editar', 'Editar producto'],
    ['/admin/productos/criticos', 'Productos con stock crítico'],
    ['/admin/productos/reportes', 'Reporte de productos'],
    ['/admin/categorias', 'Categorías'],
    ['/admin/categorias/nueva', 'Nueva categoría'],
    ['/admin/categorias/gaming/editar', 'Editar categoría'],
    ['/admin/usuarios', 'Usuarios'],
    ['/admin/usuarios/nuevo', 'Nuevo usuario'],
    ['/admin/usuarios/U003', 'Camila Rojas'],
    ['/admin/usuarios/U003/editar', 'Editar usuario'],
    ['/admin/reportes', 'Reportes'],
    ['/admin/perfil', 'Mi perfil'],
  ];

  admin.forEach(([route, heading]) => {
    it(`[admin] la ruta ${route} muestra "${heading}"`, () => {
      spyOn(authService, 'getSession').and.returnValue(mockAdmin);
      renderAt(route);
      expect(screen.getAllByRole('heading', { name: heading }).length).toBeGreaterThan(0);
    });
  });

  it('[admin] el historial de compras del usuario lista sus órdenes', () => {
    spyOn(authService, 'getSession').and.returnValue(mockAdmin);
    renderAt('/admin/usuarios/U003');
    expect(screen.getByText('ORD-20260002')).toBeTruthy();
    expect(screen.getByText('ORD-20260003')).toBeTruthy();
  });
});
