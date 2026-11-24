// src/pages/admin/CategoriesAdminPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../data/dataService';
import { PageTitle } from '../../components/common/PageTitle';
import { Alert, ErrorMessage } from '../../components/common/Alert';

export const CategoriesAdminPage = () => {
  const [list, setList] = useState(() => categoryService.getAll());
  const [ok, setOk] = useState('');
  const [error, setError] = useState('');

  const handleDelete = (c) => {
    setError('');
    if (categoryService.countProducts(c.id) > 0) {
      setError(`No puedes eliminar "${c.nombre}" porque tiene productos asociados.`);
      return;
    }
    if (!window.confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
    categoryService.remove(c.id);
    setList(categoryService.getAll());
    setOk(`Categoría "${c.nombre}" eliminada.`);
  };

  return (
    <>
      <PageTitle title="Categorías">
        <Link to="/admin/categorias/nueva" className="btn btn-success btn-sm">Nueva categoría</Link>
      </PageTitle>
      <ErrorMessage error={error} onClose={() => setError('')} />
      <Alert message={ok} variant="success" onClose={() => setOk('')} />
      <div className="table-responsive admin-panel">
        <table className="table align-middle mb-0">
          <thead><tr><th>Código</th><th>Nombre</th><th>Descripción</th><th className="text-end">Productos</th><th className="text-end">Acciones</th></tr></thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.nombre}</td><td className="small">{c.descripcion}</td>
                <td className="text-end">{categoryService.countProducts(c.id)}</td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-sm btn-outline-info me-1">Editar</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
