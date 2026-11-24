// src/pages/admin/ProductFormPage.jsx
// Una página para crear (/admin/productos/nuevo) y editar (/admin/productos/:id/editar).
import { useNavigate, useParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { ProductForm } from '../../components/admin/ProductForm';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const product = isEdit ? productService.getById(id) : undefined;

  if (isEdit && !product) return <EmptyState title="Producto no encontrado" actionTo="/admin/productos" actionLabel="Volver" />;

  const handleSubmit = (data) => {
    const saved = isEdit ? productService.update(id, data) : productService.create(data);
    navigate(`/admin/productos/${saved.id}`);
  };

  return (
    <>
      <PageTitle title={isEdit ? 'Editar producto' : 'Nuevo producto'} />
      <div className="admin-panel p-3 p-md-4">
        <ProductForm
          initialValues={product}
          categories={categoryService.getAll()}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/productos')}
          submitLabel={isEdit ? 'Guardar cambios' : 'Crear producto'}
        />
      </div>
    </>
  );
};
