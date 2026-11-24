// Checkout: validación, autocompletado con sesión y flujo de pago con orderService mockeado
import { screen, fireEvent } from '@testing-library/react';
import { CheckoutPage } from './CheckoutPage';
import { authService, orderService } from '../../data/dataService';
import { renderWithProviders, mockProduct, mockClient } from '../../test/renderWithProviders';

const cart = [{ ...mockProduct, quantity: 2 }];
const renderCheckout = (opts = {}) => renderWithProviders(<CheckoutPage />, { route: '/checkout', path: '/checkout', cart, ...opts });

const fillValid = () => {
  const set = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
  set(/^Nombre/, 'Ana');
  set(/^Apellidos/, 'Díaz');
  set(/^Correo/, 'ana@x.cl');
  set(/^Calle y número/, 'Av. Pajaritos 123');
  set(/^Región/, 'Región Metropolitana de Santiago');
  set(/^Comuna/, 'Maipú');
};

describe('CheckoutPage', () => {
  it('con el carrito vacío muestra un mensaje en vez del formulario', () => {
    renderCheckout({ cart: [] });
    expect(screen.getByText('No hay productos para pagar')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Pagar ahora/ })).toBeNull();
  });

  it('muestra el total y la tabla de productos del carrito', () => {
    renderCheckout();
    expect(screen.getByText('Total a pagar: $20.000')).toBeTruthy();
    expect(screen.getByText('Juego de Prueba')).toBeTruthy();
  });

  it('al enviar vacío muestra errores y NO crea la orden', () => {
    const spy = spyOn(orderService, 'checkout');
    renderCheckout();
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(screen.getByRole('alert').textContent).toContain('Revisa los campos');
    expect(screen.getByText('Selecciona una comuna.')).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('si hay sesión, completa los datos del cliente automáticamente', () => {
    spyOn(authService, 'getSession').and.returnValue(mockClient);
    renderCheckout();
    expect(screen.getByLabelText(/^Nombre/).value).toBe('Pedro');
    expect(screen.getByLabelText(/^Comuna/).value).toBe('Maipú');
  });

  it('pago aprobado: crea la orden, vacía el carrito y navega a compra exitosa', () => {
    spyOn(orderService, 'checkout').and.returnValue({ id: 'ORD-1', estado: 'pagada' });
    renderCheckout();
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(orderService.checkout).toHaveBeenCalledWith(jasmine.objectContaining({ simularRechazo: false, cart }));
    expect(screen.getByTestId('location').textContent).toBe('/compra/exito/ORD-1');
    expect(JSON.parse(localStorage.getItem('f4a_cart'))).toEqual([]);
  });

  it('pago rechazado: navega a la vista de error y conserva el carrito', () => {
    spyOn(orderService, 'checkout').and.returnValue({ id: 'ORD-2', estado: 'rechazada' });
    renderCheckout();
    fillValid();
    fireEvent.click(screen.getByLabelText(/simular pago rechazado/));
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(orderService.checkout.calls.mostRecent().args[0].simularRechazo).toBeTrue();
    expect(screen.getByTestId('location').textContent).toBe('/compra/error/ORD-2');
    expect(JSON.parse(localStorage.getItem('f4a_cart')).length).toBe(1);
  });
});
