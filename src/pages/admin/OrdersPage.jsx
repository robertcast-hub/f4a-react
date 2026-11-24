// src/pages/admin/OrdersPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { formatCLP, formatDate } from '../../utils/format';
import { PageTitle } from '../../components/common/PageTitle';

export const OrdersPage = () => {
  const [estado, setEstado] = useState('');
  const orders = orderService.getAll()
    .filter((o) => !estado || o.estado === estado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <>
      <PageTitle title="Órdenes y boletas">
        <select className="form-select form-select-sm" aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="pagada">Pagadas</option>
          <option value="rechazada">Rechazadas</option>
        </select>
      </PageTitle>
      <div className="table-responsive admin-panel">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>Código</th><th>Fecha</th><th>Cliente</th><th>Estado</th><th className="text-end">Total</th><th /></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="text-nowrap">{o.id}</td>
                <td>{formatDate(o.fecha)}</td>
                <td>{o.cliente.nombre} {o.cliente.apellidos}</td>
                <td><span className={`badge ${o.estado === 'pagada' ? 'text-bg-success' : 'text-bg-danger'}`}>{o.estado}</span></td>
                <td className="text-end">{formatCLP(o.total)}</td>
                <td className="text-end"><Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-light">Ver boleta</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
