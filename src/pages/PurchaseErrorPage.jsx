// src/pages/PurchaseErrorPage.jsx
import { Link } from 'react-router-dom';

export const PurchaseErrorPage = () => {
  return (
    <div className="container py-5 text-center">
      <div className="card bg-dark text-white border-danger p-5 shadow-lg mx-auto" style={{ maxWidth: '550px' }}>
        <div className="text-danger display-1 mb-3">❌</div>
        <h1 className="fw-bold text-danger mb-2">El Pago No Pudo Procesarse</h1>
        <p className="text-muted mb-4">
          Lo sentimos, ocurrió un problema con tu método de pago o la transacción fue rechazada por tu entidad bancaria.
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/checkout" className="btn btn-warning fw-bold px-4">
            Reintentar Pago
          </Link>
          <Link to="/" className="btn btn-outline-light px-4">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};