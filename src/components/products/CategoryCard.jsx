// src/components/products/CategoryCard.jsx
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category, count }) => (
  <Link to={`/categorias/${category.id}`} className="category-card text-decoration-none">
    <img src={category.imagen} alt="" loading="lazy" />
    <span className="category-card__body">
      <span className="h5 fw-bold d-block mb-1">{category.nombre}</span>
      <span className="small">{count} {count === 1 ? 'producto' : 'productos'}</span>
    </span>
  </Link>
);
