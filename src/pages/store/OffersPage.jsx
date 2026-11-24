// src/pages/store/OffersPage.jsx
import { productService } from '../../data/dataService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { PageTitle } from '../../components/common/PageTitle';

export const OffersPage = () => (
  <div className="container">
    <PageTitle title="Ofertas" subtitle="Productos con precio rebajado por tiempo limitado" />
    <ProductGrid products={productService.getOffers()} emptyTitle="No hay ofertas activas" emptyText="Vuelve pronto." />
  </div>
);
