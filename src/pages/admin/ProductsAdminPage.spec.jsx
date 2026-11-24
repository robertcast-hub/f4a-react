// Eliminación en el panel admin: se simula la confirmación del navegador con spyOn(window, 'confirm')
import { screen, fireEvent, within } from '@testing-library/react';
import { ProductsAdminPage } from './ProductsAdminPage';
import { productService } from '../../data/dataService';
import { renderWithProviders } from '../../test/renderWithProviders';

const rowOf = (name) => screen.getByText(name).closest('tr');

describe('ProductsAdminPage', () => {
  beforeEach(() => renderWithProviders(<ProductsAdminPage />, { route: '/admin/productos', path: '/admin/productos' }));

  it('lista todos los productos de la base de datos', () => {
    expect(screen.getAllByRole('row').length - 1).toBe(productService.getAll().length);
  });

  it('si el usuario confirma, elimina el producto y muestra un aviso', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    fireEvent.click(within(rowOf('Minecraft Java & Bedrock Edition')).getByRole('button', { name: 'Eliminar' }));
    expect(screen.queryByText('Minecraft Java & Bedrock Edition')).toBeNull();
    expect(screen.getByRole('alert').textContent).toContain('eliminado');
    expect(productService.getById('P005')).toBeNull();
  });

  it('si el usuario cancela, no elimina nada', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const removeSpy = spyOn(productService, 'remove');
    fireEvent.click(within(rowOf('Minecraft Java & Bedrock Edition')).getByRole('button', { name: 'Eliminar' }));
    expect(removeSpy).not.toHaveBeenCalled();
    expect(screen.getByText('Minecraft Java & Bedrock Edition')).toBeTruthy();
  });
});
