// src/components/orders/OrderReceipt.jsx
// Resumen/boleta de una orden. Se usa en compra exitosa, pago fallido y admin.
import { CustomerForm } from './CustomerForm';
import { OrderItemsTable } from './OrderItemsTable';
import { formatDate } from '../../utils/format';

export const OrderReceipt = ({ order }) => (
  <div className="receipt">
    <div className="d-flex flex-wrap justify-content-between gap-2 mb-3 small">
      <span>Código de orden: <strong>{order.id}</strong></span>
      <span>Fecha: {formatDate(order.fecha)}</span>
      <span className={`badge ${order.estado === 'pagada' ? 'text-bg-success' : 'text-bg-danger'}`}>
        {order.estado === 'pagada' ? 'Pagada' : 'Rechazada'}
      </span>
    </div>
    <CustomerForm data={order.cliente} onChange={() => {}} readOnly />
    <h2 className="h5 fw-bold mt-4">Detalle de la compra</h2>
    <OrderItemsTable items={order.items} total={order.total} />
  </div>
);
