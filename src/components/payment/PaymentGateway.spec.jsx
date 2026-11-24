// Pasarela simulada: formulario de tarjeta, billeteras y tiempo de procesamiento (reloj simulado)
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentGateway } from './PaymentGateway';
import { gatewayConfig } from '../../utils/payment';

const renderGateway = (methodId, props = {}) => render(
  <PaymentGateway methodId={methodId} total={20000} email="ana@x.cl" onResult={() => {}} onCancel={() => {}} {...props} />,
);
const type = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const fillCard = (numero) => {
  type('Número de tarjeta', numero);
  type('Nombre del titular', 'Ana Díaz');
  type('Vencimiento', '1230');
  type('CVV', '123');
};

describe('PaymentGateway', () => {
  let original;
  beforeEach(() => { original = gatewayConfig.processingMs; gatewayConfig.processingMs = 0; });
  afterEach(() => { gatewayConfig.processingMs = original; });

  it('muestra el medio elegido, el total y el aviso de simulación', () => {
    renderGateway('webpay');
    expect(screen.getByRole('heading', { name: 'Pagar con Webpay Plus' })).toBeTruthy();
    expect(screen.getByText('$20.000')).toBeTruthy();
    expect(screen.getByText(/no se realiza ningún cobro/)).toBeTruthy();
  });

  it('formatea número y vencimiento mientras el usuario escribe', () => {
    renderGateway('webpay');
    type('Número de tarjeta', '4111111111111111');
    type('Vencimiento', '1230');
    expect(screen.getByLabelText('Número de tarjeta').value).toBe('4111 1111 1111 1111');
    expect(screen.getByLabelText('Vencimiento').value).toBe('12/30');
  });

  it('con datos inválidos muestra errores y NO entrega resultado', () => {
    const onResult = jasmine.createSpy('onResult');
    renderGateway('webpay', { onResult });
    type('Número de tarjeta', '1234 5678');
    fireEvent.click(screen.getByRole('button', { name: 'Pagar $20.000' }));
    expect(screen.getByText('Número de tarjeta inválido.')).toBeTruthy();
    expect(screen.getByText('El CVV tiene 3 dígitos.')).toBeTruthy();
    expect(onResult).not.toHaveBeenCalled();
  });

  it('tarjeta aprobada: entrega el resultado con solo los últimos 4 dígitos', () => {
    const onResult = jasmine.createSpy('onResult');
    renderGateway('visa', { onResult });
    fillCard('4111111111111111');
    fireEvent.click(screen.getByRole('button', { name: 'Pagar $20.000' }));
    expect(onResult).toHaveBeenCalledOnceWith({ metodo: 'visa', aprobado: true, motivo: null, ultimos4: '1111' });
  });

  it('tarjeta de rechazo: entrega aprobado false con el motivo', () => {
    const onResult = jasmine.createSpy('onResult');
    renderGateway('webpay', { onResult });
    fillCard('4000000000000002');
    fireEvent.click(screen.getByRole('button', { name: 'Pagar $20.000' }));
    expect(onResult.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ aprobado: false, motivo: 'Fondos insuficientes' }));
  });

  it('PayPal: autorizar aprueba y cancelar rechaza', () => {
    const onResult = jasmine.createSpy('onResult');
    renderGateway('paypal', { onResult });
    expect(screen.queryByLabelText('Número de tarjeta')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Autorizar pago' }));
    expect(onResult.calls.mostRecent().args[0].aprobado).toBeTrue();
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar en PayPal' }));
    expect(onResult.calls.mostRecent().args[0].aprobado).toBeFalse();
  });

  it('"Cambiar medio de pago" llama a onCancel', () => {
    const onCancel = jasmine.createSpy('onCancel');
    renderGateway('mercadopago', { onCancel });
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar medio de pago' }));
    expect(onCancel).toHaveBeenCalled();
  });

  it('muestra "Procesando" y entrega el resultado al terminar la espera (jasmine.clock)', () => {
    gatewayConfig.processingMs = 1500;
    jasmine.clock().install();
    try {
      const onResult = jasmine.createSpy('onResult');
      renderGateway('mercadopago', { onResult });
      fireEvent.click(screen.getByRole('button', { name: 'Autorizar pago' }));
      expect(screen.getByRole('status').textContent).toContain('Procesando pago con Mercado Pago');
      expect(onResult).not.toHaveBeenCalled();
      act(() => jasmine.clock().tick(1500));
      expect(onResult).toHaveBeenCalledTimes(1);
    } finally {
      jasmine.clock().uninstall();
    }
  });
});
