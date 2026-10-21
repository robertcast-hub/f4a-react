// src/pages/ProductDetailPage.jsx
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getProducts } from '../data/dataService';
import { useCart } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  // Capturar el término de búsqueda de la URL (?search=...)
  const queryParams = new URLSearchParams(location.search);
  const searchFilter = queryParams.get('search') || '';

  // Scroll arriba cada vez que cambia la búsqueda o el ID
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, searchFilter]);

  const allProducts = getProducts();

  // Obtener TODAS las coincidencias si hay término de búsqueda activo
  const matchingProducts = searchFilter
    ? allProducts.filter((p) => {
        const nombre = (p.nombre || p.title || p.name || '').toLowerCase();
        const categoria = (p.categoria || p.category || '').toLowerCase();
        const term = searchFilter.toLowerCase();
        return nombre.includes(term) || categoria.includes(term);
      })
    : [];

  // Producto individual si se accede directamente por ruta /producto/:id sin busqueda
  const singleProduct = allProducts.find((p) => String(p.id) === String(id));

  // Definir la lista de productos a renderizar (múltiples por búsqueda o 1 individual)
  const productsToDisplay = searchFilter 
    ? matchingProducts 
    : (singleProduct ? [singleProduct] : []);

  // CASO: Sin coincidencias
  if (productsToDisplay.length === 0) {
    return (
      <div className="container my-5 py-5 d-flex justify-content-center align-items-center text-center" style={{ minHeight: '70vh' }}>
        <div className="bg-dark text-white p-5 rounded border border-secondary shadow-lg w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-warning mb-3 fw-bold">⚠️ Producto no encontrado</h2>
          <p className="text-secondary mb-4">
            {searchFilter 
              ? `No se encontraron resultados para "${searchFilter}".`
              : `El producto solicitado no existe o no está disponible.`}
          </p>
          <Link to="/" className="btn btn-success fw-bold px-4 py-2">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  // CASO PRINCIPAL: Renderiza las tarjetas anchas una debajo de la otra en vertical
  return (
    <div className="container my-5 py-4 d-flex flex-column align-items-center" style={{ minHeight: '75vh' }}>
      
      {/* Título de resultados si proviene de una búsqueda */}
      {searchFilter && (
        <div className="text-center mb-4">
          <h3 className="text-success fw-bold">
            Resultados de búsqueda: "{searchFilter}"
          </h3>
          <span className="badge bg-secondary">
            {productsToDisplay.length} producto(s) encontrado(s)
          </span>
        </div>
      )}

      {/* Lista vertical de tarjetas de detalle */}
      <div className="d-flex flex-column gap-4 w-100 align-items-center" style={{ maxWidth: '950px' }}>
        {productsToDisplay.map((product) => (
          <div 
            key={product.id}
            className="card bg-dark text-white border-secondary shadow-lg w-100 p-4"
          >
            <div className="row g-4 align-items-center">
              
              {/* Imagen del Producto */}
              <div className="col-md-5 text-center">
                <img
                  src={product.imagen || product.image}
                  alt={product.nombre || product.title}
                  className="img-fluid rounded border border-secondary w-100 object-fit-cover shadow"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              {/* Información y Detalle */}
              <div className="col-md-7 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-success text-black text-uppercase mb-2 fw-bold">
                    {product.categoria || product.category || 'Gaming'}
                  </span>

                  <h3 className="fw-bold mb-2">{product.nombre || product.title}</h3>

                  {product.descripcion && (
                    <p className="text-secondary small mb-3">{product.descripcion}</p>
                  )}

                  <h4 className="text-success fw-bold mb-4">
                    ${product.precio?.toLocaleString('es-CL')} CLP
                  </h4>
                </div>

                {/* Acciones */}
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-success fw-bold flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Agregar al Carrito
                  </button>

                  <button
                    className="btn btn-outline-light px-4 py-2"
                    onClick={() => navigate(-1)}
                  >
                    Volver
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};