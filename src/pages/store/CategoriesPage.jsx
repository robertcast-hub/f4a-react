// src/pages/store/CategoriesPage.jsx
import { categoryService } from '../../data/dataService';
import { CategoryCard } from '../../components/products/CategoryCard';
import { PageTitle } from '../../components/common/PageTitle';

export const CategoriesPage = () => {
  const categories = categoryService.getAll();
  return (
    <div className="container">
      <PageTitle title="Categorías" subtitle="Elige qué tipo de producto buscas" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {categories.map((c) => (
          <div className="col" key={c.id}>
            <CategoryCard category={c} count={categoryService.countProducts(c.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};
