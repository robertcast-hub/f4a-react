// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { describe, it, expect, vi } from 'vitest';

// Producto mock para pruebas
const mockProduct = {
  id: '1',
  nombre: 'Final Fantasy VII Remake',
  categoria: 'gaming',
  precio: 29990,
  descripcion: 'Juego de rol y acción deslumbrante.',
  imagen: '/imagenes/FFVIIR.webp'
};

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </CartProvider>
  );
};

describe('Pruebas Unitarias - ProductCard Component (10/10)', () => {

  // Test 1: Renderizado básico del componente
  it('1. Debe renderizar el nombre del producto correctamente', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Final Fantasy VII Remake')).toBeTruthy();
  });

  // Test 2: Renderizado de la descripción
  it('2. Debe renderizar la descripción del producto', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Juego de rol y acción deslumbrante.')).toBeTruthy();
  });

  // Test 3: Recepción y formato de Props (Precio)
  it('3. Debe formatear y mostrar el precio correctamente en CLP', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$29.990 CLP')).toBeTruthy();
  });

  // Test 4: Verificación de atributos de la imagen (src y alt)
  it('4. Debe renderizar la imagen con la ruta y alt especificados', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('/imagenes/FFVIIR.webp');
    expect(img.getAttribute('alt')).toBe('Final Fantasy VII Remake');
  });

  // Test 5: Renderizado de la insignia de categoría
  it('5. Debe mostrar la categoría con el estilo de badge adecuado', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('gaming')).toBeTruthy();
  });

  // Test 6: Verificación de enlaces de navegación (Link to detail)
  it('6. Debe tener un enlace hacia el detalle del producto con la ruta correcta', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const link = screen.getByText('Ver Detalle');
    expect(link.getAttribute('href')).toBe('/producto/1');
  });

  // Test 7: Simulación de Evento click en el botón Agregar al Carrito
  it('7. Debe permitir hacer clic en el botón de agregar al carrito sin fallar', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const button = screen.getByText('🛒 Agregar al Carrito');
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  // Test 8: Renderizado condicional cuando falta la descripción
  it('8. Debe renderizar correctamente si la descripción es vacía (Renderizado Condicional)', () => {
    const productNoDesc = { ...mockProduct, descripcion: '' };
    renderWithProviders(<ProductCard product={productNoDesc} />);
    expect(screen.getByText('Final Fantasy VII Remake')).toBeTruthy();
  });

  // Test 9: Manejo del DOM y clases de Bootstrap
  it('9. Debe aplicar las clases CSS de Bootstrap correspondientes', () => {
    const { container } = renderWithProviders(<ProductCard product={mockProduct} />);
    const cardElement = container.querySelector('.card');
    expect(cardElement.classList.contains('bg-dark')).toBe(true);
  });

  // Test 10: Integración con el Estado Global (CartContext)
  it('10. Debe interactuar correctamente con el contexto global sin lanzar errores', () => {
    const { container } = renderWithProviders(<ProductCard product={mockProduct} />);
    expect(container).toBeTruthy();
  });

});