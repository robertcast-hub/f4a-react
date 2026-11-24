// src/pages/store/CategoryPage.jsx
import { Link, useParams } from 'react-router-dom';
import { categoryService, productService } from '../../data/dataService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const CategoryPage = () => {
  const { id } = useParams();
  const category = categoryService.getById(id);
  const categories = categoryService.getAll();

  if (!category) {
    return (
      <div className="container">
        <EmptyState title="Categoría no encontrada" actionTo="/categorias" actionLabel="Ver categorías" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex flex-wrap gap-2 mb-4" aria-label="Otras categorías">
        {categories.map((c) => (
          <Link key={c.id} to={`/categorias/${c.id}`}
            className={`btn btn-sm ${c.id === id ? 'btn-success' : 'btn-outline-light'}`}
            aria-current={c.id === id ? 'page' : undefined}>
            {c.nombre}
          </Link>
        ))}
      </div>
      <PageTitle title={category.nombre} subtitle={category.descripcion} />
      <ProductGrid products={productService.getByCategory(id)} emptyTitle="Aún no hay productos en esta categoría" />
    </div>
  );
};
