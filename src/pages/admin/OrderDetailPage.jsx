// src/pages/admin/OrderDetailPage.jsx
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { OrderReceipt } from '../../components/orders/OrderReceipt';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const order = orderService.getById(id);
  if (!order) return <EmptyState title="Orden no encontrada" actionTo="/admin/ordenes" actionLabel="Volver a órdenes" />;
  return (
    <>
      <PageTitle title={`Boleta ${order.id}`}>
        <button type="button" className="btn btn-outline-light btn-sm no-print" onClick={() => window.print()}>Imprimir</button>
        <Link to="/admin/ordenes" className="btn btn-outline-light btn-sm no-print">Volver</Link>
      </PageTitle>
      <div className="admin-panel p-3 p-md-4"><OrderReceipt order={order} /></div>
    </>
  );
};
