// src/test/renderWithProviders.jsx
// Monta un componente con Router + AuthProvider + CartProvider, igual que en la app real.
// Cualquier navegación a otra ruta muestra <LocationDisplay>, para poder verificar redirecciones.
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}{location.search}</div>;
};

export const renderWithProviders = (ui, { route = '/', path = '/', cart = [] } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <CartProvider initialCart={cart}>
          <Routes>
            <Route path={path} element={ui} />
            <Route path="*" element={<LocationDisplay />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

// Datos de prueba reutilizables (fixtures)
export const mockProduct = {
  id: 'T1',
  nombre: 'Juego de Prueba',
  categoria: 'gaming',
  precio: 10000,
  precioOferta: null,
  stock: 5,
  stockCritico: 2,
  imagen: '/imagenes/test.webp',
  descripcion: 'Descripción de prueba',
  destacado: true,
};

export const mockOffer = { ...mockProduct, id: 'T2', nombre: 'Oferta de Prueba', precioOferta: 7500 };

export const mockAdmin = { id: 'U001', nombre: 'Admin', apellidos: 'F4A', email: 'admin@f4a.cl', rol: 'admin' };
export const mockClient = {
  id: 'U002', nombre: 'Pedro', apellidos: 'Soto', email: 'cliente@f4a.cl', rol: 'cliente',
  direccion: 'Los Crisantemos 603', region: 'Región Metropolitana de Santiago', comuna: 'Maipú',
};
