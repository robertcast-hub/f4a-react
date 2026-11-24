// src/components/products/ProductCard.jsx
// Responsabilidad única: mostrar un producto y avisar (onAdd) cuando el usuario lo quiere comprar.
// No conoce el carrito: quien lo usa decide qué hacer en onAdd.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PriceTag } from './PriceTag';

export const ProductCard = ({ product, onAdd }) => {
  const [added, setAdded] = useState(false);
  const agotado = Number(product.stock) <= 0;
  const enOferta = product.precioOferta != null && product.precioOferta < product.precio;

  // Limpia el temporizador si el componente se desmonta
  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    onAdd?.(product);
    setAdded(true);
  };

  return (
    <article className="card product-card h-100" data-testid="product-card">
      <Link to={`/producto/${product.id}`} className="product-card__media" tabIndex={-1} aria-hidden="true">
        <img src={product.imagen} alt="" loading="lazy" />
        {enOferta && <span className="badge text-bg-danger product-card__tag">Oferta</span>}
      </Link>
      <div className="card-body d-flex flex-column">
        <h3 className="h6 fw-bold mb-1">
          <Link to={`/producto/${product.id}`} className="text-reset text-decoration-none">
            {product.nombre}
          </Link>
        </h3>
        <p className="small text-secondary-emphasis mb-3 clamp-2">
          {product.descripcion || 'Sin descripción disponible.'}
        </p>
        <div className="mt-auto">
          <PriceTag precio={product.precio} precioOferta={product.precioOferta} />
          {agotado ? (
            <p className="text-danger small fw-semibold mt-2 mb-0">Sin stock</p>
          ) : (
            <button
              type="button"
              className={`btn w-100 mt-2 ${added ? 'btn-outline-success' : 'btn-success'}`}
              onClick={handleAdd}
            >
              {added ? 'Agregado al carrito' : 'Agregar al carrito'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
