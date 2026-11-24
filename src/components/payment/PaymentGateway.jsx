// src/components/payment/PaymentGateway.jsx
// Pantalla de la pasarela de pago SIMULADA. Según el medio elegido muestra:
//  - Tarjeta (Webpay, Visa, Mastercard): formulario de tarjeta con validación real (Luhn, vencimiento, CVV).
//  - Billetera (PayPal, Mercado Pago): pantalla para autorizar o cancelar el pago.
// Al terminar llama a onResult({ metodo, aprobado, motivo, ultimos4 }).
import { useEffect, useRef, useState } from 'react';
import { FormField } from '../common/FormField';
import { formatCLP } from '../../utils/format';
import {
  getPaymentMethod, validateCard, processPayment, formatCardNumber, formatExpiry,
  onlyDigits, TEST_CARDS, gatewayConfig,
} from '../../utils/payment';
import { hasErrors } from '../../utils/validators';

const emptyCard = { numero: '', titular: '', vencimiento: '', cvv: '' };

export const PaymentGateway = ({ methodId, total, email, onResult, onCancel }) => {
  const method = getPaymentMethod(methodId);
  const [card, setCard] = useState(emptyCard);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const timer = useRef(null);
  const sectionRef = useRef(null);

  // Al abrir la pasarela, la pantalla baja hasta ella; al cerrarla se cancela el temporizador
  useEffect(() => {
    sectionRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    return () => clearTimeout(timer.current);
  }, []);

  // Simula el tiempo de respuesta del banco antes de entregar el resultado
  const finish = (request) => {
    const run = () => onResult(processPayment(request));
    if (gatewayConfig.processingMs <= 0) {
      run();
      return;
    }
    setProcessing(true);
    timer.current = setTimeout(run, gatewayConfig.processingMs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formatted = {
      numero: formatCardNumber(value),
      vencimiento: formatExpiry(value),
      cvv: onlyDigits(value).slice(0, 3),
    }[name] ?? value;
    setCard((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const found = validateCard(card, methodId);
    setErrors(found);
    if (hasErrors(found)) return;
    finish({ metodo: methodId, card });
  };

  const field = (name) => ({ name, value: card[name], error: errors[name], onChange: handleChange });

  return (
    <section ref={sectionRef} className="gateway p-3 p-md-4" aria-labelledby="gateway-title">
      <div className="d-flex align-items-center gap-3 mb-3">
        <img src={method.logo} alt="" height="34" className="bg-white rounded p-1" />
        <div>
          <h2 id="gateway-title" className="h5 fw-bold mb-0">Pagar con {method.nombre}</h2>
          <p className="small mb-0">Total: <strong>{formatCLP(total)}</strong></p>
        </div>
      </div>
      <p className="small gateway__note">
        Pasarela simulada para fines académicos: no se realiza ningún cobro. No ingreses datos de una tarjeta real.
      </p>

      {processing ? (
        <div className="text-center py-5" role="status">
          <div className="spinner-border text-success mb-3" aria-hidden="true" />
          <p className="mb-0">Procesando pago con {method.nombre}…</p>
        </div>
      ) : method.tipo === 'tarjeta' ? (
        <form noValidate onSubmit={handleCardSubmit} className="row g-3" aria-label="Datos de la tarjeta">
          <FormField label="Número de tarjeta" inputMode="numeric" autoComplete="off" placeholder="4111 1111 1111 1111"
            className="col-12" {...field('numero')} />
          <FormField label="Nombre del titular" autoComplete="off" className="col-12" {...field('titular')} />
          <FormField label="Vencimiento" placeholder="MM/AA" inputMode="numeric" autoComplete="off"
            className="col-6" {...field('vencimiento')} />
          <FormField label="CVV" type="password" inputMode="numeric" autoComplete="off" placeholder="123"
            className="col-6" {...field('cvv')} />
          <div className="col-12 d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-success">Pagar {formatCLP(total)}</button>
            <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cambiar medio de pago</button>
          </div>
          <details className="col-12 small">
            <summary>Tarjetas de prueba</summary>
            <table className="table table-sm mt-2 mb-0">
              <thead><tr><th>Número</th><th>Marca</th><th>Resultado</th></tr></thead>
              <tbody>
                {TEST_CARDS.map((t) => (
                  <tr key={t.numero}><td className="font-monospace">{t.numero}</td><td>{t.marca}</td><td>{t.resultado}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mb-0 mt-1">Usa cualquier nombre, una fecha futura y cualquier CVV de 3 dígitos.</p>
          </details>
        </form>
      ) : (
        <div>
          <p>
            Inicia sesión en {method.nombre} como <strong>{email}</strong> y autoriza el cobro de{' '}
            <strong>{formatCLP(total)}</strong> a F4A Tienda Digital.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-success" onClick={() => finish({ metodo: methodId, autorizado: true })}>
              Autorizar pago
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={() => finish({ metodo: methodId, autorizado: false })}>
              Cancelar en {method.nombre}
            </button>
            <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cambiar medio de pago</button>
          </div>
        </div>
      )}
    </section>
  );
};
