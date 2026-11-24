// Renderizado de LISTAS: se dibujan todos los elementos del conjunto de datos
import { screen, fireEvent, within } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';
import { Header } from '../layout/Header';
import { renderWithProviders, mockProduct, mockOffer } from '../../test/renderWithProviders';

const lista = [mockProduct, mockOffer, { ...mockProduct, id: 'T3', nombre: 'Tercero' }];

describe('ProductGrid', () => {
  it('renderiza una tarjeta por cada producto del conjunto de datos', () => {
    renderWithProviders(<ProductGrid products={lista} />);
    expect(screen.getAllByTestId('product-card').length).toBe(3);
    lista.forEach((p) => expect(screen.getByText(p.nombre)).toBeTruthy());
  });

  it('muestra un estado vacío cuando la lista no tiene elementos', () => {
    renderWithProviders(<ProductGrid products={[]} emptyTitle="Nada por aquí" />);
    expect(screen.queryAllByTestId('product-card').length).toBe(0);
    expect(screen.getByText('Nada por aquí')).toBeTruthy();
  });

  it('al agregar una tarjeta se actualiza el contador global del carrito', () => {
    renderWithProviders(<><Header /><ProductGrid products={lista} /></>);
    const card = screen.getAllByTestId('product-card')[0];
    fireEvent.click(within(card).getByRole('button', { name: 'Agregar al carrito' }));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });
});
