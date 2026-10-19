// src/pages/PurchaseSuccessPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const PurchaseSuccessPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('f4a_last_order');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  return (
    <div className="container py-5 text-center">
      <div className="card bg-dark text-white border-success p-5 shadow-lg mx-auto" style={{ maxWidth: '650px' }}>
        <div className="text-success display-1 mb-3">✅</div>
        <h1 className="fw-bold text-success mb-2">¡Compra Completada con Éxito!</h1>
        <p className="lead text-muted mb-4">
          Gracias por tu compra en F4A Digital Store. Hemos enviado el comprobante a tu correo.
        </p>

        {order && (
          <div className="bg-black p-4 rounded border border-secondary text-start mb-4">
            <h5 className="text-success fw-bold border-bottom border-secondary pb-2 mb-3">
              Detalle del Pedido #{order.id}
            </h5>
            <p className="mb-1"><strong>Cliente:</strong> {order.cliente.nombre}</p>
            <p className="mb-1"><strong>Email:</strong> {order.cliente.email}</p>
            <p className="mb-3"><strong>Fecha:</strong> {order.fecha}</p>

            <h6 className="fw-bold border-bottom border-secondary pb-1 mt-3 mb-2">Tus Claves Digitales:</h6>
            <ul className="list-group list-group-flush mb-2">
              {order.items.map((item) => (
                <li key={item.id} className="list-group-item bg-black text-white border-secondary px-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{item.nombre}</span>
                    <span className="badge bg-success font-monospace fs-6">
                      F4A-{Math.random().toString(36).substring(2, 7).toUpperCase()}-{Math.random().toString(36).substring(2, 7).toUpperCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between border-top border-secondary pt-3 mt-3 fs-5">
              <span>Total Pagado:</span>
              <span className="text-success fw-bold">${order.total.toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
        )}

        <div>
          <Link to="/" className="btn btn-success btn-lg fw-bold px-4">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};