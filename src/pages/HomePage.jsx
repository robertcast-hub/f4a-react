import { useEffect, useState } from 'react';
import { getProducts } from '../data/dataService';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const featuredProducts = products.filter((p) => p.destacado);

  return (
    <div className="container py-5">
      {/* Banner de Bienvenida */}
      <section 
        className="text-white p-5 rounded border border-secondary text-center mb-5 shadow position-relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/imagenes/banner-juegos-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="display-4 fw-bold d-flex align-items-center justify-content-center flex-wrap gap-2 mb-3">
          <span style={{ color: '#0066ff' }}>Bienvenido a</span>
          
          <img 
            src="/imagenes/logo.webp" 
            alt="F4A Logo" 
            height="55" 
            className="mx-1 object-fit-contain" 
          />
          
          <span className="text-success">Tienda Digital</span>
        </h1>
        
        <p className="lead text-white fw-medium mb-0">
          Consigue las mejores claves digitales de videojuegos, software, suscripciones y gift cards al mejor precio.
        </p>
      </section>

      {/* Productos Destacados */}
      <section>
        <h2 className="text-success fw-bold text-center mb-4">
          🔥 Productos Destacados
        </h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {featuredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};