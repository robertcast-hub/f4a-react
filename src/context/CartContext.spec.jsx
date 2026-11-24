// Pruebas de ESTADO global: lógica del carrito (agregar, actualizar, eliminar, totales, persistencia)
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { mockProduct, mockOffer } from '../test/renderWithProviders';

// Componente de prueba que expone el estado y las acciones del contexto
const CartProbe = () => {
  const { cart, count, total, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="total">{total}</span>
      <span data-testid="items">{cart.map((i) => `${i.id}x${i.quantity}`).join(',')}</span>
      <button type="button" onClick={() => addToCart(mockProduct)}>add1</button>
      <button type="button" onClick={() => addToCart(mockOffer, 2)}>add2</button>
      <button type="button" onClick={() => updateQuantity('T1', 4)}>set4</button>
      <button type="button" onClick={() => updateQuantity('T1', 0)}>set0</button>
      <button type="button" onClick={() => removeFromCart('T2')}>remove2</button>
      <button type="button" onClick={clearCart}>clear</button>
    </div>
  );
};

const setup = (initialCart) => render(<CartProvider initialCart={initialCart}><CartProbe /></CartProvider>);
const click = (name) => fireEvent.click(screen.getByText(name));
const text = (id) => screen.getByTestId(id).textContent;

describe('CartContext', () => {
  it('parte vacío', () => {
    setup();
    expect(text('count')).toBe('0');
    expect(text('total')).toBe('0');
  });

  it('agregar el mismo producto dos veces suma cantidades en vez de duplicar la fila', () => {
    setup();
    click('add1');
    click('add1');
    expect(text('items')).toBe('T1x2');
    expect(text('count')).toBe('2');
  });

  it('no permite superar el stock disponible', () => {
    setup([{ ...mockProduct, quantity: 5 }]); // stock 5
    click('add1');
    expect(text('items')).toBe('T1x5');
  });

  it('calcula el total usando el precio de oferta cuando existe', () => {
    setup();
    click('add1'); // 10.000
    click('add2'); // 2 × 7.500
    expect(text('total')).toBe('25000');
    expect(text('count')).toBe('3');
  });

  it('updateQuantity cambia la cantidad y con 0 elimina el producto', () => {
    setup();
    click('add1');
    click('set4');
    expect(text('items')).toBe('T1x4');
    click('set0');
    expect(text('items')).toBe('');
  });

  it('removeFromCart y clearCart vacían el carrito', () => {
    setup();
    click('add1');
    click('add2');
    click('remove2');
    expect(text('items')).toBe('T1x1');
    click('clear');
    expect(text('count')).toBe('0');
  });

  it('persiste el carrito en localStorage', () => {
    setup();
    click('add1');
    expect(JSON.parse(localStorage.getItem('f4a_v3_cart'))[0].id).toBe('T1');
  });

  it('useCart fuera del Provider lanza un error descriptivo', () => {
    spyOn(console, 'error'); // React registra el error; lo silenciamos en la salida
    expect(() => render(<CartProbe />)).toThrowError(/CartProvider/);
  });
});
