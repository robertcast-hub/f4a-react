// src/pages/FaqPage.jsx
export const FaqPage = () => {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-success fw-bold mb-4">Preguntas Frecuentes</h1>
      <div className="accordion accordion-flush" id="faqAccordion">
        <div className="accordion-item bg-dark text-light border-secondary">
          <h2 className="accordion-header">
            <button className="accordion-button bg-dark text-success collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              ¿Cómo recibo mi producto comprado?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Todas las claves digitales se envían inmediatamente a tu correo electrónico una vez confirmado el pago.
            </div>
          </div>
        </div>
        <div className="accordion-item bg-dark text-light border-secondary">
          <h2 className="accordion-header">
            <button className="accordion-button bg-dark text-success collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              ¿Qué medios de pago aceptan?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Aceptamos Webpay, PayPal, MercadoPago, tarjetas VISA y Mastercard.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};