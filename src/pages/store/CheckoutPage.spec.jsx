// Checkout en dos pasos: datos + medio de pago → pasarela simulada → orden pagada o rechazada
import { screen, fireEvent } from '@testing-library/react';
import { CheckoutPage } from './CheckoutPage';
import { authService, orderService } from '../../data/dataService';
import { gatewayConfig } from '../../utils/payment';
import { renderWithProviders, mockProduct, mockClient } from '../../test/renderWithProviders';

const cart = [{ ...mockProduct, quantity: 2 }];
const renderCheckout = (opts = {}) => renderWithProviders(<CheckoutPage />, { route: '/checkout', path: '/checkout', cart, ...opts });
const set = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

const fillCustomer = () => {
  set(/^Nombre\*$/, 'Ana');
  set(/^Apellidos/, 'Díaz');
  set(/^Correo/, 'ana@x.cl');
  set(/^Calle y número/, 'Av. Pajaritos 123');
  set(/^Región/, 'Región Metropolitana de Santiago');
  set(/^Comuna/, 'Maipú');
};
const goToGateway = (method) => {
  fillCustomer();
  fireEvent.click(screen.getByRole('radio', { name: method }));
  fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
};
const payWithCard = (numero) => {
  set('Número de tarjeta', numero);
  set('Nombre del titular', 'Ana Díaz');
  set('Vencimiento', '1230');
  set('CVV', '123');
  fireEvent.click(screen.getByRole('button', { name: 'Pagar $20.000' }));
};

describe('CheckoutPage', () => {
  let original;
  beforeEach(() => { original = gatewayConfig.processingMs; gatewayConfig.processingMs = 0; });
  afterEach(() => { gatewayConfig.processingMs = original; });

  it('con el carrito vacío muestra un mensaje en vez del formulario', () => {
    renderCheckout({ cart: [] });
    expect(screen.getByText('No hay productos para pagar')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Pagar ahora/ })).toBeNull();
  });

  it('muestra el total, la tabla y los 5 medios de pago', () => {
    renderCheckout();
    expect(screen.getByText('Total a pagar: $20.000')).toBeTruthy();
    expect(screen.getByText('Juego de Prueba')).toBeTruthy();
    expect(screen.getAllByRole('radio').length).toBe(5);
  });

  it('al enviar vacío muestra errores (incluido el medio de pago) y NO abre la pasarela', () => {
    const spy = spyOn(orderService, 'checkout');
    renderCheckout();
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));
    expect(screen.getAllByRole('alert')[0].textContent).toContain('Revisa los campos');
    expect(screen.getByText('Selecciona una comuna.')).toBeTruthy();
    expect(screen.getByText('Selecciona un medio de pago.')).toBeTruthy();
    expect(screen.queryByLabelText('Número de tarjeta')).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('si hay sesión, completa los datos del cliente automáticamente', () => {
    spyOn(authService, 'getSession').and.returnValue(mockClient);
    renderCheckout();
    expect(screen.getByLabelText(/^Nombre\*$/).value).toBe('Pedro');
    expect(screen.getByLabelText(/^Comuna/).value).toBe('Maipú');
  });

  it('al reintentar tras un rechazo conserva los datos del cliente (state de la navegación)', () => {
    renderWithProviders(<CheckoutPage />, {
      route: { pathname: '/checkout', state: { cliente: { nombre: 'Ana', comuna: 'Maipú', region: 'Región Metropolitana de Santiago' } } },
      path: '/checkout', cart,
    });
    expect(screen.getByLabelText(/^Nombre\*$/).value).toBe('Ana');
    expect(screen.getByLabelText(/^Comuna/).value).toBe('Maipú');
  });

  it('con datos válidos abre la pasarela del medio elegido, y se puede volver', () => {
    renderCheckout();
    goToGateway(/Webpay Plus/);
    expect(screen.getByRole('heading', { name: 'Pagar con Webpay Plus' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar medio de pago' }));
    expect(screen.getByLabelText(/^Nombre\*$/).value).toBe('Ana');
  });

  it('pago con tarjeta aprobada: registra la orden, vacía el carrito y navega a compra exitosa', () => {
    spyOn(orderService, 'checkout').and.returnValue({ id: 'ORD-1', estado: 'pagada' });
    renderCheckout();
    goToGateway(/Webpay Plus/);
    payWithCard('4111111111111111');
    expect(orderService.checkout).toHaveBeenCalledWith(jasmine.objectContaining({
      cart, pago: { metodo: 'webpay', aprobado: true, motivo: null, ultimos4: '1111' },
    }));
    expect(screen.getByTestId('location').textContent).toBe('/compra/exito/ORD-1');
    expect(JSON.parse(localStorage.getItem('f4a_v3_cart'))).toEqual([]);
  });

  it('tarjeta rechazada: navega a la vista de error y conserva el carrito', () => {
    spyOn(orderService, 'checkout').and.returnValue({ id: 'ORD-2', estado: 'rechazada' });
    renderCheckout();
    goToGateway(/^Visa/);
    payWithCard('4000000000000002');
    expect(orderService.checkout.calls.mostRecent().args[0].pago.motivo).toBe('Fondos insuficientes');
    expect(screen.getByTestId('location').textContent).toBe('/compra/error/ORD-2');
    expect(JSON.parse(localStorage.getItem('f4a_v3_cart')).length).toBe(1);
  });

  it('flujo real con PayPal (sin mocks): la orden queda guardada como pagada con PayPal', () => {
    renderCheckout();
    goToGateway(/PayPal/);
    fireEvent.click(screen.getByRole('button', { name: 'Autorizar pago' }));
    const order = orderService.getAll().at(-1);
    expect(order.estado).toBe('pagada');
    expect(order.pago.metodo).toBe('paypal');
    expect(screen.getByTestId('location').textContent).toBe(`/compra/exito/${order.id}`);
  });
});
