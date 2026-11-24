// src/pages/store/FaqPage.jsx
// Acordeón controlado con estado de React (sin depender del JS de Bootstrap).
import { useState } from 'react';
import { PageTitle } from '../../components/common/PageTitle';

const faqs = [
  { q: '¿Cómo recibo mi producto?', a: 'La clave llega a tu correo apenas se confirma el pago.' },
  { q: '¿Qué medios de pago aceptan?', a: 'Webpay, PayPal, MercadoPago, Visa y Mastercard.' },
  { q: '¿Qué pasa si una clave no funciona?', a: 'Escríbenos con el código de orden y la reemplazamos o te devolvemos el dinero.' },
];

export const FaqPage = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="container" style={{ maxWidth: 820 }}>
      <PageTitle title="Preguntas frecuentes" />
      <div className="accordion">
        {faqs.map((f, i) => (
          <div className="accordion-item" key={f.q}>
            <h2 className="accordion-header">
              <button type="button" className={`accordion-button ${open === i ? '' : 'collapsed'}`}
                aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
              </button>
            </h2>
            <div className={`accordion-collapse collapse ${open === i ? 'show' : ''}`}>
              <div className="accordion-body">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
