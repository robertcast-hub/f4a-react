// src/pages/admin/CriticalProductsPage.jsx
import { Link } from 'react-router-dom';
import { productService } from '../../data/dataService';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const CriticalProductsPage = () => {
  const list = productService.getCritical();
  return (
    <>
      <PageTitle title="Productos con stock crítico" subtitle="Stock igual o menor al mínimo definido" />
      {!list.length ? (
        <EmptyState title="Todo el inventario está sobre el mínimo" />
      ) : (
        <div className="table-responsive admin-panel">
          <table className="table align-middle mb-0">
            <thead><tr><th>Producto</th><th className="text-end">Stock</th><th className="text-end">Mínimo</th><th /></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td className="text-end text-warning fw-bold">{p.stock}</td>
                  <td className="text-end">{p.stockCritico}</td>
                  <td className="text-end"><Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-info">Reponer</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
