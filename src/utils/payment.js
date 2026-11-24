// src/utils/payment.js
// Pasarela de pago SIMULADA. No se conecta a ningún banco: valida los datos como lo haría
// una pasarela real y decide el resultado con tarjetas de prueba conocidas.
// Por seguridad, el resultado solo devuelve los últimos 4 dígitos: el número completo y el CVV
// nunca salen de este módulo ni se guardan en localStorage.

export const PAYMENT_METHODS = [
  { id: 'webpay', nombre: 'Webpay Plus', tipo: 'tarjeta', descripcion: 'Débito o crédito (Visa y Mastercard)', logo: '/imagenes/pago/webpay.webp', marcas: ['visa', 'mastercard'] },
  { id: 'visa', nombre: 'Visa', tipo: 'tarjeta', descripcion: 'Tarjeta de crédito Visa', logo: '/imagenes/pago/visa.webp', marcas: ['visa'] },
  { id: 'mastercard', nombre: 'Mastercard', tipo: 'tarjeta', descripcion: 'Tarjeta de crédito Mastercard', logo: '/imagenes/pago/mastercard.webp', marcas: ['mastercard'] },
  { id: 'paypal', nombre: 'PayPal', tipo: 'billetera', descripcion: 'Paga con tu cuenta PayPal', logo: '/imagenes/pago/paypal.webp' },
  { id: 'mercadopago', nombre: 'Mercado Pago', tipo: 'billetera', descripcion: 'Paga con tu cuenta Mercado Pago', logo: '/imagenes/pago/mercadopago.webp' },
];

export const getPaymentMethod = (id) => PAYMENT_METHODS.find((m) => m.id === id) ?? null;

/** Tarjetas de prueba, al estilo de las que publican las pasarelas reales para su modo test. */
export const TEST_CARDS = [
  { numero: '4111 1111 1111 1111', marca: 'Visa', resultado: 'Aprobada' },
  { numero: '5555 5555 5555 4444', marca: 'Mastercard', resultado: 'Aprobada' },
  { numero: '4000 0000 0000 0002', marca: 'Visa', resultado: 'Rechazada: fondos insuficientes' },
  { numero: '5105 1051 0510 5100', marca: 'Mastercard', resultado: 'Rechazada: tarjeta bloqueada' },
];

const REJECTIONS = {
  '4000000000000002': 'Fondos insuficientes',
  '5105105105105100': 'Tarjeta bloqueada por el banco emisor',
};

export const onlyDigits = (value) => String(value ?? '').replace(/\D/g, '');

/** Agrupa el número en bloques de 4: "4111111111111111" → "4111 1111 1111 1111" */
export const formatCardNumber = (value) => onlyDigits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

/** Inserta la barra de la fecha: "1228" → "12/28" */
export const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

/** Algoritmo de Luhn: el dígito de control que usan todas las tarjetas */
export const isValidLuhn = (value) => {
  const digits = onlyDigits(value);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
};

/** Marca según el prefijo: Visa empieza en 4; Mastercard en 51-55 o 2221-2720 */
export const detectBrand = (value) => {
  const digits = onlyDigits(value);
  if (/^4/.test(digits)) return 'visa';
  const two = Number(digits.slice(0, 2));
  const four = Number(digits.slice(0, 4));
  if ((two >= 51 && two <= 55) || (four >= 2221 && four <= 2720)) return 'mastercard';
  return null;
};

/** Fecha MM/AA válida y no vencida (la tarjeta vence al terminar el mes indicado) */
export const isValidExpiry = (value, now = new Date()) => {
  const match = /^(\d{2})\/(\d{2})$/.exec(String(value ?? ''));
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const endOfMonth = new Date(year, month, 1); // primer día del mes siguiente
  return endOfMonth > now;
};

export const isValidCvv = (value) => /^\d{3}$/.test(String(value ?? ''));

/** Valida el formulario de tarjeta para el medio elegido. Devuelve un objeto de errores. */
export const validateCard = (card, methodId, now = new Date()) => {
  const errors = {};
  const method = getPaymentMethod(methodId);
  const brand = detectBrand(card.numero);

  if (!isValidLuhn(card.numero)) errors.numero = 'Número de tarjeta inválido.';
  else if (!brand || (method?.marcas && !method.marcas.includes(brand))) {
    errors.numero = `${method?.nombre ?? 'Este medio'} no acepta esta tarjeta.`;
  }
  if (String(card.titular ?? '').trim().length < 3) errors.titular = 'Ingresa el nombre como aparece en la tarjeta.';
  if (!isValidExpiry(card.vencimiento, now)) errors.vencimiento = 'Fecha inválida o tarjeta vencida (MM/AA).';
  if (!isValidCvv(card.cvv)) errors.cvv = 'El CVV tiene 3 dígitos.';
  return errors;
};

/**
 * Procesa el pago simulado y devuelve { metodo, aprobado, motivo, ultimos4 }.
 * - Tarjetas: se rechazan las tarjetas de prueba de rechazo; el resto (válidas) se aprueban.
 * - Billeteras (PayPal / Mercado Pago): el resultado depende de si el usuario autorizó el pago.
 */
export const processPayment = ({ metodo, card, autorizado }) => {
  const method = getPaymentMethod(metodo);
  if (!method) return { metodo, aprobado: false, motivo: 'Medio de pago no disponible', ultimos4: null };

  if (method.tipo === 'billetera') {
    return autorizado
      ? { metodo, aprobado: true, motivo: null, ultimos4: null }
      : { metodo, aprobado: false, motivo: `El usuario canceló el pago en ${method.nombre}`, ultimos4: null };
  }

  const digits = onlyDigits(card?.numero);
  const motivo = REJECTIONS[digits] ?? null;
  return { metodo, aprobado: !motivo, motivo, ultimos4: digits.slice(-4) };
};

/** Texto para la boleta: "Visa terminada en 1111" o "PayPal" */
export const describePayment = (pago) => {
  if (!pago) return 'No informado';
  const nombre = getPaymentMethod(pago.metodo)?.nombre ?? pago.metodo;
  return pago.ultimos4 ? `${nombre} · tarjeta terminada en ${pago.ultimos4}` : nombre;
};

/** Tiempo que la pasarela simula "procesando". Las pruebas lo dejan en 0 para no esperar. */
export const gatewayConfig = { processingMs: 1500 };
