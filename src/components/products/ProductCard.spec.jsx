// Pruebas de ProductCard: props, renderizado condicional, eventos y estado local
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { mockProduct, mockOffer } from '../../test/renderWithProviders';

const renderCard = (product, onAdd) =>
  render(<MemoryRouter><ProductCard product={product} onAdd={onAdd} /></MemoryRouter>);

describe('ProductCard', () => {
  it('renderiza nombre, descripción y precio formateado desde props', () => {
    renderCard(mockProduct);
    expect(screen.getByText('Juego de Prueba')).toBeTruthy();
    expect(screen.getByText('Descripción de prueba')).toBeTruthy();
    expect(screen.getByText('$10.000')).toBeTruthy();
  });

  it('enlaza al detalle del producto', () => {
    renderCard(mockProduct);
    expect(screen.getByRole('link', { name: 'Juego de Prueba' }).getAttribute('href')).toBe('/producto/T1');
  });

  it('muestra texto alternativo cuando falta la descripción', () => {
    renderCard({ ...mockProduct, descripcion: '' });
    expect(screen.getByText('Sin descripción disponible.')).toBeTruthy();
  });

  it('muestra etiqueta de oferta, precio rebajado y porcentaje solo si hay oferta', () => {
    renderCard(mockOffer);
    expect(screen.getByText('Oferta')).toBeTruthy();
    expect(screen.getByText('$7.500')).toBeTruthy();
    expect(screen.getByText('-25%')).toBeTruthy();
  });

  it('no muestra etiqueta de oferta cuando no hay precio rebajado', () => {
    renderCard(mockProduct);
    expect(screen.queryByText('Oferta')).toBeNull();
  });

  it('al hacer clic llama a onAdd con el producto (evento + mock)', () => {
    const onAdd = jasmine.createSpy('onAdd');
    renderCard(mockProduct, onAdd);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(onAdd).toHaveBeenCalledOnceWith(mockProduct);
  });

  it('cambia su estado a "Agregado" y vuelve al estado inicial después de 1,8 s (reloj simulado)', () => {
    jasmine.clock().install();
    try {
      renderCard(mockProduct, () => {});
      fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
      expect(screen.getByRole('button', { name: 'Agregado al carrito' })).toBeTruthy();
      act(() => jasmine.clock().tick(1800));
      expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeTruthy();
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it('sin stock oculta el botón y muestra "Sin stock"', () => {
    renderCard({ ...mockProduct, stock: 0 });
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Sin stock')).toBeTruthy();
  });
});
