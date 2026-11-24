import { screen, fireEvent } from '@testing-library/react';
import { CartPage } from './CartPage';
import { renderWithProviders, mockProduct, mockOffer } from '../../test/renderWithProviders';

const cart = [{ ...mockProduct, quantity: 1 }, { ...mockOffer, quantity: 2 }];
const renderCart = (c = cart) => renderWithProviders(<CartPage />, { route: '/carrito', path: '/carrito', cart: c });

describe('CartPage', () => {
  it('lista los productos y calcula el total (10.000 + 2 × 7.500)', () => {
    renderCart();
    expect(screen.getByText('Juego de Prueba')).toBeTruthy();
    expect(screen.getByTestId('cart-total').textContent).toBe('$25.000');
  });

  it('aumentar la cantidad actualiza el total', () => {
    renderCart();
    fireEvent.click(screen.getAllByLabelText('Aumentar cantidad')[0]);
    expect(screen.getByTestId('cart-total').textContent).toBe('$35.000');
  });

  it('eliminar un producto lo quita de la lista', () => {
    renderCart();
    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
    expect(screen.queryByText('Juego de Prueba')).toBeNull();
    expect(screen.getByTestId('cart-total').textContent).toBe('$15.000');
  });

  it('vaciar el carrito muestra el estado vacío', () => {
    renderCart();
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('el botón "Comprar ahora" lleva al checkout', () => {
    renderCart();
    expect(screen.getByRole('link', { name: 'Comprar ahora' }).getAttribute('href')).toBe('/checkout');
  });
});
