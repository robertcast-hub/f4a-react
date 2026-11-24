// src/pages/store/ProductsPage.jsx
// Catálogo completo con filtros. El texto de búsqueda se sincroniza con ?q= en la URL
// para que la búsqueda del encabezado y los enlaces compartidos funcionen.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductGrid } from '../../components/products/ProductGrid';
import { PageTitle } from '../../components/common/PageTitle';

export const ProductsPage = () => {
  const [params, setParams] = useSearchParams();
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden] = useState('');
  const query = params.get('q') ?? '';
  const categories = categoryService.getAll();

  const products = useMemo(
    () => productService.search({ query, categoria, orden }),
    [query, categoria, orden],
  );

  const handleFilters = (next) => {
    setCategoria(next.categoria);
    setOrden(next.orden);
    setParams(next.query ? { q: next.query } : {}, { replace: true });
  };

  return (
    <div className="container">
      <PageTitle title="Productos" subtitle="Todo el catálogo de F4A" />
      <ProductFilters
        filters={{ query, categoria, orden }}
        categories={categories}
        onChange={handleFilters}
        resultCount={products.length}
      />
      <ProductGrid
        products={products}
        emptyTitle="No encontramos productos con esos filtros"
        emptyText="Prueba con otra palabra o quita el filtro de categoría."
      />
    </div>
  );
};
