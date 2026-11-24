// src/pages/admin/ProductsAdminPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { PageTitle } from '../../components/common/PageTitle';
import { Alert } from '../../components/common/Alert';

export const ProductsAdminPage = () => {
  const [products, setProducts] = useState(() => productService.getAll());
  const [mensaje, setMensaje] = useState('');
  const categorias = Object.fromEntries(categoryService.getAll().map((c) => [c.id, c.nombre]));

  const handleDelete = (product) => {
    if (!window.confirm(`¿Eliminar "${product.nombre}"? Esta acción no se puede deshacer.`)) return;
    productService.remove(product.id);
    setProducts(productService.getAll());
    setMensaje(`Producto "${product.nombre}" eliminado.`);
  };

  return (
    <>
      <PageTitle title="Productos" subtitle={`${products.length} productos en el catálogo`}>
        <Link to="/admin/productos/criticos" className="btn btn-outline-warning btn-sm">Stock crítico</Link>
        <Link to="/admin/productos/reportes" className="btn btn-outline-light btn-sm">Reportes</Link>
        <Link to="/admin/productos/nuevo" className="btn btn-success btn-sm">Nuevo producto</Link>
      </PageTitle>
      <Alert message={mensaje} variant="success" onClose={() => setMensaje('')} />
      <div className="table-responsive admin-panel">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>Producto</th><th>Categoría</th><th className="text-end">Precio</th><th className="text-end">Stock</th><th className="text-end">Acciones</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={p.imagen} alt="" width="40" height="40" className="rounded object-fit-cover" />
                    <span>{p.nombre}</span>
                  </div>
                </td>
                <td>{categorias[p.categoria] ?? p.categoria}</td>
                <td className="text-end">{formatCLP(p.precioOferta ?? p.precio)}</td>
                <td className={`text-end ${p.stock <= p.stockCritico ? 'text-warning fw-bold' : ''}`}>{p.stock}</td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-light me-1">Ver</Link>
                  <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-info me-1">Editar</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
