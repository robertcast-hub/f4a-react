import { screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { authService } from '../../data/dataService';
import { renderWithProviders, mockAdmin, mockClient } from '../../test/renderWithProviders';

const Secret = () => <p>Zona admin</p>;
const renderProtected = () => renderWithProviders(
  <ProtectedRoute role="admin"><Secret /></ProtectedRoute>,
  { route: '/admin', path: '/admin' },
);

describe('ProtectedRoute', () => {
  it('sin sesión redirige a /login', () => {
    spyOn(authService, 'getSession').and.returnValue(null);
    renderProtected();
    expect(screen.queryByText('Zona admin')).toBeNull();
    expect(screen.getByTestId('location').textContent).toBe('/login');
  });

  it('un cliente sin rol admin es enviado al inicio', () => {
    spyOn(authService, 'getSession').and.returnValue(mockClient);
    renderProtected();
    expect(screen.getByTestId('location').textContent).toBe('/');
  });

  it('un administrador ve el contenido protegido', () => {
    spyOn(authService, 'getSession').and.returnValue(mockAdmin);
    renderProtected();
    expect(screen.getByText('Zona admin')).toBeTruthy();
  });
});
