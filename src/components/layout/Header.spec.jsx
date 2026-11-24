import { screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { authService } from '../../data/dataService';
import { renderWithProviders, mockProduct, mockAdmin } from '../../test/renderWithProviders';

describe('Header', () => {
  it('muestra la cantidad y el total del carrito', () => {
    renderWithProviders(<Header />, { cart: [{ ...mockProduct, quantity: 3 }] });
    expect(screen.getByTestId('cart-count').textContent).toBe('3');
    expect(screen.getByText(/Carrito \$30\.000/)).toBeTruthy();
  });

  it('la búsqueda navega a /productos?q=<texto>', () => {
    renderWithProviders(<Header />);
    fireEvent.change(screen.getByLabelText('Buscar productos'), { target: { value: 'gta' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(screen.getByTestId('location').textContent).toBe('/productos?q=gta');
  });

  it('el botón de menú móvil alterna aria-expanded (estado local)', () => {
    renderWithProviders(<Header />);
    const toggle = screen.getByLabelText('Abrir menú');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('con sesión de administrador muestra el acceso al panel (sesión mockeada)', () => {
    spyOn(authService, 'getSession').and.returnValue(mockAdmin);
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Panel' })).toBeTruthy();
    expect(screen.queryByText('Iniciar sesión')).toBeNull();
  });
});
