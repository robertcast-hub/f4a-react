import { screen, fireEvent } from '@testing-library/react';
import { ProductsPage } from './ProductsPage';
import { productService } from '../../data/dataService';
import { renderWithProviders, mockProduct, mockOffer } from '../../test/renderWithProviders';

describe('ProductsPage', () => {
  it('lee el término de búsqueda desde la URL (?q=)', () => {
    renderWithProviders(<ProductsPage />, { route: '/productos?q=minecraft', path: '/productos' });
    expect(screen.getAllByTestId('product-card').length).toBe(1);
    expect(screen.getByLabelText('Buscar').value).toBe('minecraft');
  });

  it('pasa los filtros al servicio de búsqueda (mock) y muestra lo que devuelve', () => {
    spyOn(productService, 'search').and.returnValue([mockProduct, mockOffer]);
    renderWithProviders(<ProductsPage />, { route: '/productos', path: '/productos' });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'software' } });
    expect(productService.search).toHaveBeenCalledWith({ query: '', categoria: 'software', orden: '' });
    expect(screen.getAllByTestId('product-card').length).toBe(2);
  });

  it('muestra un estado vacío cuando no hay coincidencias', () => {
    renderWithProviders(<ProductsPage />, { route: '/productos?q=zzzz', path: '/productos' });
    expect(screen.getByText('No encontramos productos con esos filtros')).toBeTruthy();
  });
});
