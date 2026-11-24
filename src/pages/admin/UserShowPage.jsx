// src/pages/admin/UserShowPage.jsx
// Muestra el usuario y su historial de compras.
import { Link, useParams } from 'react-router-dom';
import { userService, orderService } from '../../data/dataService';
import { formatCLP, formatDate } from '../../utils/format';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const UserShowPage = () => {
  const { id } = useParams();
  const u = userService.getById(id);
  if (!u) return <EmptyState title="Usuario no encontrado" actionTo="/admin/usuarios" actionLabel="Volver" />;
  const historial = orderService.getByUser(u.id);

  return (
    <>
      <PageTitle title={`${u.nombre} ${u.apellidos}`} subtitle={u.email}>
        <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-success btn-sm">Editar usuario</Link>
        <Link to="/admin/usuarios" className="btn btn-outline-light btn-sm">Volver</Link>
      </PageTitle>
      <div className="admin-panel p-3 p-md-4 mb-4">
        <dl className="row mb-0">
          <dt className="col-sm-3">RUN</dt><dd className="col-sm-9">{u.run}</dd>
          <dt className="col-sm-3">Rol</dt><dd className="col-sm-9">{u.rol}</dd>
          <dt className="col-sm-3">Dirección</dt><dd className="col-sm-9">{[u.direccion, u.comuna, u.region].filter(Boolean).join(', ') || 'Sin dirección'}</dd>
        </dl>
      </div>
      <h2 className="h5 fw-bold">Historial de compras</h2>
      {!historial.length ? (
        <p>Este usuario aún no tiene compras.</p>
      ) : (
        <div className="table-responsive admin-panel">
          <table className="table align-middle mb-0">
            <thead><tr><th>Orden</th><th>Fecha</th><th>Estado</th><th className="text-end">Total</th><th /></tr></thead>
            <tbody>
              {historial.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{formatDate(o.fecha)}</td>
                  <td><span className={`badge ${o.estado === 'pagada' ? 'text-bg-success' : 'text-bg-danger'}`}>{o.estado}</span></td>
                  <td className="text-end">{formatCLP(o.total)}</td>
                  <td className="text-end"><Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-light">Ver boleta</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
