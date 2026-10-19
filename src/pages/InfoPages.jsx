// src/pages/InfoPages.jsx
import React from 'react';

export const AboutPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Sobre Nosotros - F4A</h2>
    <p className="lead">F4A Digital Store es tu plataforma de confianza para la adquisición de licencias de software, videojuegos y gift cards[cite: 2].</p>
    <p>Nuestra misión es ofrecer productos 100% originales con entrega digital instantánea al mejor precio del mercado[cite: 2].</p>
  </div>
);

export const QuienesSomosPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Quiénes Somos</h2>
    <p className="lead">Somos un equipo apasionado por la tecnología y los videojuegos, enfocado en brindar soluciones digitales rápidas y seguras.</p>
  </div>
);

export const ContactPage = () => (
  <div className="container py-5 text-white" style={{ maxWidth: '600px' }}>
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Contacto</h2>
    <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado con éxito!'); }}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control bg-dark text-white border-secondary" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control bg-dark text-white border-secondary" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Mensaje</label>
        <textarea className="form-control bg-dark text-white border-secondary" rows="4" required></textarea>
      </div>
      <button type="submit" className="btn btn-success fw-bold">Enviar Mensaje</button>
    </form>
  </div>
);

export const FAQsPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Preguntas Frecuentes (FAQs)</h2>
    <div className="accordion accordion-flush bg-dark rounded border border-secondary" id="faqAccordion">
      <div className="accordion-item bg-dark text-white">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed bg-dark text-success fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
            ¿Cómo recibo mi clave digital?
          </button>
        </h2>
        <div id="faq1" className="accordion-collapse collapse p-3">
          La clave digital se envía automáticamente a tu correo electrónico inmediatamente después de confirmar el pago.
        </div>
      </div>
    </div>
  </div>
);

export const TermsPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Términos y Condiciones</h2>
    <p className="small text-muted">Al realizar compras en F4A aceptas nuestras políticas de venta digital y garantía de activación de 30 días[cite: 2].</p>
  </div>
);

export const PrivacyPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Política de Privacidad</h2>
    <p className="small text-muted">Tus datos personales y de pago se procesan de forma cifrada y segura bajo los estándares internacionales.</p>
  </div>
);

export const CookiesPage = () => (
  <div className="container py-5 text-white">
    <h2 className="text-success border-bottom border-secondary pb-2 mb-4">Política de Cookies</h2>
    <p className="small text-muted">Utilizamos cookies técnicas para mantener el estado de tu carrito de compras y la sesión activa.</p>
  </div>
);