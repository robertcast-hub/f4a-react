// src/pages/CategoryPage.jsx
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../data/dataService';
import { ProductCard } from '../components/ProductCard';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const products = getProductsByCategory(categoryName);

  const titulos = {
    gaming: 'Juegos y Videojuegos',
    software: 'Software y Licencias',
    subscripciones: 'Suscripciones Digitales',
    regalos: 'Tarjetas de Regalo',
    randomkey: 'Claves Aleatorias VIP',
  };

  const tituloActual = titulos[categoryName?.toLowerCase()] || `Categoría: ${categoryName}`;

  return (
    <div className="container py-5">
      <h2 className="text-success border-bottom border-secondary pb-2 mb-4 text-capitalize">
        🎮 {tituloActual}
      </h2>
      {products.length === 0 ? (
        <div className="alert alert-warning text-center my-5">
          No se encontraron productos en esta categoría.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};