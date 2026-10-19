// src/pages/AboutPage.jsx
export const AboutPage = () => {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-success fw-bold mb-4">Sobre Nosotros & Quiénes Somos</h1>
      <div className="card bg-dark border-secondary p-4 shadow">
        <p className="lead">
          <strong>F4A Tienda Digital</strong> es una plataforma dedicada a la distribución de productos digitales: videojuegos, licencias de software, suscripciones y tarjetas de regalo al mejor precio del mercado.
        </p>
        <h4 className="text-success mt-3">Nuestra Misión</h4>
        <p>
          Brindar a nuestros clientes un acceso rápido, seguro y confiable a sus contenidos digitales preferidos con entrega inmediata y atención personalizada.
        </p>
        <h4 className="text-success mt-3">¿Por qué elegirnos?</h4>
        <ul>
          <li>Claves 100% oficiales y verificadas.</li>
          <li>Atención al cliente 24/7.</li>
          <li>Múltiples métodos de pago locales e internacionales.</li>
        </ul>
      </div>
    </div>
  );
};
