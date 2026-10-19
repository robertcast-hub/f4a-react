// src/components/ProductCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    // Ocultar la notificación/mensaje después de 2 segundos
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="card h-100 bg-dark text-white border-secondary shadow-sm position-relative">
      {/* Notificación Flotante de Confirmación */}
      {added && (
        <div 
          className="position-absolute top-50 start-50 translate-middle bg-success text-white px-3 py-2 rounded-pill shadow-lg fw-bold border border-light"
          style={{ zIndex: 10, animation: 'fadeIn 0.3s ease-in-out' }}
        >
          ✅ Producto agregado
        </div>
      )}

      {/* Contenedor de la Imagen */}
      <div className="position-relative bg-black text-center overflow-hidden" style={{ height: '220px' }}>
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <span className="position-absolute top-0 start-0 m-2 badge bg-success text-uppercase">
          {product.categoria}
        </span>
      </div>

      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          {/* Nombre del Producto */}
          <h5 className="card-title text-truncate fw-bold mb-2" title={product.nombre}>
            {product.nombre}
          </h5>

          {/* Descripción */}
          <p 
            className="card-text text-light opacity-75 small mb-3"
            style={{
              minHeight: '40px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.descripcion || 'Sin descripción disponible.'}
          </p>
        </div>

        <div>
          {/* Precio en CLP */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-5 fw-bold text-success">
              ${Number(product.precio).toLocaleString('es-CL')} CLP
            </span>
          </div>

          {/* Botones de Acción */}
          <div className="d-grid gap-2">
            <button
              onClick={handleAddToCart}
              className={`btn fw-bold btn-sm transition-all ${
                added ? 'btn-outline-success text-white bg-success' : 'btn-success'
              }`}
            >
              {added ? '✅ ¡Producto agregado!' : '🛒 Agregar al Carrito'}
            </button>

            <Link
              to={`/producto/${product.id}`}
              className="btn btn-outline-light btn-sm fw-semibold"
            >
              Ver Detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};