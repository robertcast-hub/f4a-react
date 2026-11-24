// src/pages/store/PurchaseResultPage.jsx
// Una sola vista para ambos resultados de pago; `success` decide el contenido.
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { OrderReceipt } from '../../components/orders/OrderReceipt';
import { EmptyState } from '../../components/common/EmptyState';
import { Alert } from '../../components/common/Alert';

export const PurchaseResultPage = ({ success }) => {
  const { orderId } = useParams();
  const order = orderService.getById(orderId);
  const [aviso, setAviso] = useState('');

  if (!order) {
    return (
      <div className="container">
        <EmptyState title="No encontramos la orden" actionTo="/" actionLabel="Volver al inicio" />
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className={`result p-3 p-md-4 ${success ? 'result--ok' : 'result--error'}`}>
        <h1 className="h3 fw-bold">
          {success
            ? `Se ha realizado la compra n.º ${order.id}`
            : `No se pudo realizar el pago n.º ${order.id}`}
        </h1>
        {success ? (
          <p>Enviamos las claves y la boleta a <strong>{order.cliente.email}</strong>.</p>
        ) : (
          <>
            <p>
              {order.pago?.motivo ?? 'El medio de pago rechazó la transacción.'}. Tu carrito sigue guardado,
              así que puedes intentarlo de nuevo con el mismo u otro medio de pago.
            </p>
            <Link to="/checkout" state={{ cliente: order.cliente }} className="btn btn-success mb-3">
              Volver a realizar el pago
            </Link>
          </>
        )}
        <OrderReceipt order={order} />
        {success && (
          <div className="d-flex flex-wrap gap-2 justify-content-center mt-4 no-print">
            <button type="button" className="btn btn-danger" onClick={() => window.print()}>Imprimir boleta en PDF</button>
            <button type="button" className="btn btn-success" onClick={() => setAviso(`Boleta enviada a ${order.cliente.email}.`)}>
              Enviar boleta por email
            </button>
          </div>
        )}
        <div className="mt-3"><Alert message={aviso} variant="success" onClose={() => setAviso('')} /></div>
      </div>
    </div>
  );
};
