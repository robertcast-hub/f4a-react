// src/pages/LegalPage.jsx
export const LegalPage = ({ title }) => {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-success fw-bold mb-4">{title}</h1>
      <div className="card bg-dark border-secondary p-4 shadow">
        <p>
          En <strong>F4A Tienda Digital</strong> valoramos la transparencia y la protección de los datos de nuestros usuarios. Todos los términos y políticas se rigen bajo las normativas vigentes de comercio electrónico y protección de datos personales.
        </p>
        <p className="mb-0">
          Para consultas adicionales sobre este apartado legal, contáctanos a <strong>legal@f4a.cl</strong>.
        </p>
      </div>
    </div>
  );
};