// src/pages/store/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { CategoryCard } from '../../components/products/CategoryCard';

const slides = [
  { titulo: 'GTA VI en reserva', texto: 'Asegura tu clave para el día del lanzamiento.', imagen: '/imagenes/gta6.webp', to: '/producto/P003' },
  { titulo: 'Ofertas de la semana', texto: 'Juegos y licencias con hasta 40% de descuento.', imagen: '/imagenes/banner-juegos-bg.jpg', to: '/ofertas' },
  { titulo: 'Licencias originales', texto: 'Windows y Office con activación inmediata.', imagen: '/imagenes/bannerSistemas.webp', to: '/categorias/software' },
];

export const HomePage = () => {
  // Lectura inicial perezosa: se consulta la "base de datos" una vez al montar
  const [featured] = useState(() => productService.getFeatured());
  const [offers] = useState(() => productService.getOffers().slice(0, 4));
  const [categories] = useState(() => categoryService.getAll());
  const [slide, setSlide] = useState(0);
  const current = slides[slide];

  return (
    <div className="container">
      <section className="hero mb-5" aria-roledescription="carrusel" aria-label="Destacados">
        <img src={current.imagen} alt="" className="hero__img" />
        <div className="hero__body">
          <h1 className="display-6 fw-bold">{current.titulo}</h1>
          <p className="lead mb-3">{current.texto}</p>
          <Link to={current.to} className="btn btn-success btn-lg">Ver más</Link>
        </div>
        <div className="hero__dots">
          {slides.map((s, i) => (
            <button
              key={s.titulo}
              type="button"
              className={i === slide ? 'active' : ''}
              aria-label={`Ir a diapositiva ${i + 1}`}
              aria-current={i === slide}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="h3 fw-bold mb-3">Categorías</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
          {categories.map((c) => (
            <div className="col" key={c.id}>
              <CategoryCard category={c} count={categoryService.countProducts(c.id)} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <h2 className="h3 fw-bold mb-0">En oferta</h2>
          <Link to="/ofertas">Ver todas las ofertas</Link>
        </div>
        <ProductGrid products={offers} />
      </section>

      <section>
        <h2 className="h3 fw-bold mb-3">Destacados</h2>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
};
