// src/pages/ProductDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/dataService';
import { useCart } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-success mt-3">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4 bg-dark p-4 rounded border border-secondary text-white">
        <div className="col-md-5">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="img-fluid rounded w-100"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=F4A+Product';
            }}
          />
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-success text-uppercase mb-2">{product.categoria}</span>
            <h1 className="fw-bold mb-3">{product.nombre}</h1>
            <p className="lead text-muted">{product.descripcion}</p>
            <h2 className="text-success fw-bold my-4">
              ${product.precio.toLocaleString('es-CL')} CLP
            </h2>
          </div>
          <div className="d-flex gap-3">
            <button onClick={() => addToCart(product)} className="btn btn-success btn-lg flex-grow-1">
              🛒 Agregar al Carrito
            </button>
            <Link to="/" className="btn btn-outline-light btn-lg">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};