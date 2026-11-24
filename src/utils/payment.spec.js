// Lógica de la pasarela simulada: validación de tarjetas y resultado del pago
import {
  isValidLuhn, detectBrand, isValidExpiry, isValidCvv, validateCard, processPayment,
  formatCardNumber, formatExpiry, describePayment, PAYMENT_METHODS,
} from './payment';

const now = new Date(2026, 10, 24); // 24-11-2026
const okCard = { numero: '4111 1111 1111 1111', titular: 'Pedro Soto', vencimiento: '12/28', cvv: '123' };

describe('payment', () => {
  it('ofrece los 5 medios de pago del sitio', () => {
    expect(PAYMENT_METHODS.map((m) => m.id)).toEqual(['webpay', 'visa', 'mastercard', 'paypal', 'mercadopago']);
  });

  it('isValidLuhn acepta números válidos y rechaza un dígito alterado', () => {
    expect(isValidLuhn('4111 1111 1111 1111')).toBeTrue();
    expect(isValidLuhn('5555555555554444')).toBeTrue();
    expect(isValidLuhn('4111 1111 1111 1112')).toBeFalse();
    expect(isValidLuhn('123')).toBeFalse();
  });

  it('detectBrand reconoce Visa y Mastercard por el prefijo', () => {
    expect(detectBrand('4111111111111111')).toBe('visa');
    expect(detectBrand('5555555555554444')).toBe('mastercard');
    expect(detectBrand('2221000000000009')).toBe('mastercard');
    expect(detectBrand('3714496353984314')).toBeNull();
  });

  it('isValidExpiry rechaza fechas pasadas y meses imposibles, y acepta el mes en curso', () => {
    expect(isValidExpiry('11/26', now)).toBeTrue();
    expect(isValidExpiry('10/26', now)).toBeFalse();
    expect(isValidExpiry('13/30', now)).toBeFalse();
    expect(isValidExpiry('1228', now)).toBeFalse();
  });

  it('isValidCvv exige exactamente 3 dígitos', () => {
    expect(isValidCvv('123')).toBeTrue();
    expect(isValidCvv('12')).toBeFalse();
    expect(isValidCvv('12a')).toBeFalse();
  });

  it('formatea el número en bloques de 4 y la fecha como MM/AA', () => {
    expect(formatCardNumber('4111111111111111999')).toBe('4111 1111 1111 1111');
    expect(formatExpiry('1228')).toBe('12/28');
    expect(formatExpiry('1')).toBe('1');
  });

  it('validateCard no devuelve errores con una tarjeta válida', () => {
    expect(validateCard(okCard, 'webpay', now)).toEqual({});
  });

  it('validateCard marca todos los campos inválidos', () => {
    const errors = validateCard({ numero: '1234', titular: '', vencimiento: '01/20', cvv: '1' }, 'webpay', now);
    expect(Object.keys(errors).sort()).toEqual(['cvv', 'numero', 'titular', 'vencimiento']);
  });

  it('validateCard rechaza una Mastercard cuando el medio elegido es Visa', () => {
    const errors = validateCard({ ...okCard, numero: '5555 5555 5555 4444' }, 'visa', now);
    expect(errors.numero).toBe('Visa no acepta esta tarjeta.');
  });

  it('processPayment aprueba una tarjeta válida y solo devuelve los últimos 4 dígitos', () => {
    const r = processPayment({ metodo: 'visa', card: okCard });
    expect(r).toEqual({ metodo: 'visa', aprobado: true, motivo: null, ultimos4: '1111' });
    expect(JSON.stringify(r)).not.toContain('4111111111111111');
  });

  it('processPayment rechaza las tarjetas de prueba de rechazo con su motivo', () => {
    expect(processPayment({ metodo: 'webpay', card: { numero: '4000 0000 0000 0002' } }))
      .toEqual(jasmine.objectContaining({ aprobado: false, motivo: 'Fondos insuficientes' }));
    expect(processPayment({ metodo: 'mastercard', card: { numero: '5105 1051 0510 5100' } }).motivo)
      .toContain('bloqueada');
  });

  it('en billeteras el resultado depende de si el usuario autoriza', () => {
    expect(processPayment({ metodo: 'paypal', autorizado: true }).aprobado).toBeTrue();
    const cancel = processPayment({ metodo: 'mercadopago', autorizado: false });
    expect(cancel.aprobado).toBeFalse();
    expect(cancel.motivo).toContain('Mercado Pago');
    expect(processPayment({ metodo: 'bitcoin' }).aprobado).toBeFalse();
  });

  it('describePayment arma el texto de la boleta', () => {
    expect(describePayment({ metodo: 'visa', ultimos4: '1111' })).toBe('Visa · tarjeta terminada en 1111');
    expect(describePayment({ metodo: 'paypal', ultimos4: null })).toBe('PayPal');
    expect(describePayment(undefined)).toBe('No informado');
  });
});
