import { screen, fireEvent } from '@testing-library/react';
import { PurchaseResultPage } from './PurchaseResultPage';
import { renderWithProviders } from '../../test/renderWithProviders';

const renderResult = (success, id) => renderWithProviders(
  <PurchaseResultPage success={success} />,
  { route: `/compra/x/${id}`, path: '/compra/x/:orderId' },
);

describe('PurchaseResultPage', () => {
  it('compra exitosa muestra código, total y botones de boleta', () => {
    renderResult(true, 'ORD-20260001');
    expect(screen.getByText(/Se ha realizado la compra n\.º ORD-20260001/)).toBeTruthy();
    expect(screen.getByTestId('order-total').textContent).toBe('$20.970');
    expect(screen.getByTestId('payment-info').textContent).toContain('Webpay Plus · tarjeta terminada en 1111');
    fireEvent.click(screen.getByRole('button', { name: 'Enviar boleta por email' }));
    expect(screen.getByRole('alert').textContent).toContain('cliente@f4a.cl');
  });

  it('pago fallido muestra el botón para reintentar y no ofrece boleta', () => {
    renderResult(false, 'ORD-20260002');
    expect(screen.getByText(/No se pudo realizar el pago/)).toBeTruthy();
    expect(screen.getByTestId('payment-info').textContent).toContain('El usuario canceló el pago en PayPal');
    expect(screen.getByRole('link', { name: 'Volver a realizar el pago' }).getAttribute('href')).toBe('/checkout');
    expect(screen.queryByRole('button', { name: /Imprimir/ })).toBeNull();
  });

  it('una orden inexistente muestra un estado vacío', () => {
    renderResult(true, 'NOEXISTE');
    expect(screen.getByText('No encontramos la orden')).toBeTruthy();
  });
});
