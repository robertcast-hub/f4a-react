import { screen, fireEvent } from '@testing-library/react';
import { AdminLayout } from './AdminLayout';
import { authService } from '../../data/dataService';
import { renderWithProviders, mockAdmin } from '../../test/renderWithProviders';

describe('AdminLayout', () => {
  beforeEach(() => {
    spyOn(authService, 'getSession').and.returnValue(mockAdmin);
    renderWithProviders(<AdminLayout />, { route: '/admin', path: '/admin' });
  });

  it('muestra el menú de las 7 secciones del panel y el correo de la sesión', () => {
    ['Dashboard', 'Órdenes', 'Productos', 'Categorías', 'Usuarios', 'Reportes', 'Perfil']
      .forEach((name) => expect(screen.getByRole('link', { name })).toBeTruthy());
    expect(screen.getByText('admin@f4a.cl')).toBeTruthy();
  });

  it('el botón de menú móvil abre y cierra la navegación', () => {
    const toggle = screen.getByRole('button', { name: 'Menú' });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.textContent).toBe('Cerrar');
  });

  it('cerrar sesión llama a authService.logout y vuelve al login', () => {
    const logout = spyOn(authService, 'logout');
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(logout).toHaveBeenCalled();
    expect(screen.getByTestId('location').textContent).toBe('/login');
  });
});
