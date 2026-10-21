// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  // Estado del Carrito Vacío con letras blancas visibles
  if (!cart || cart.length === 0) {
    return (
      <div 
        className="container my-5 py-5 d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: '65vh' }}
      >
        <div className="bg-dark p-5 rounded border border-secondary shadow-lg w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-white fw-bold mb-3">
            Tu carrito está vacío 🛒
          </h2>
          <p className="text-light mb-4 fs-5">
            Explora nuestro catálogo y agrega tus juegos o licencias favoritas.
          </p>
          <Link to="/" className="btn btn-success fw-bold px-4 py-2 fs-6">
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 py-4" style={{ minHeight: '70vh' }}>
      <h2 className="text-white fw-bold mb-4">🛒 Carrito de Compras</h2>

      <div className="row g-4">
        {/* Lista de productos en el carrito */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="card bg-dark text-white border-secondary p-3 shadow-sm d-flex flex-row align-items-center justify-content-between gap-3"
              >
                <img
                  src={item.imagen || item.image}
                  alt={item.nombre || item.title}
                  className="rounded object-fit-cover"
                  style={{ width: '80px', height: '80px' }}
                />

                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-1 text-white">{item.nombre || item.title}</h5>
                  <p className="text-success fw-bold mb-0">
                    ${item.precio?.toLocaleString('es-CL')} CLP
                  </p>
                </div>

                {/* Controles de cantidad */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary text-white fw-bold"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="fw-bold px-2 text-white">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary text-white fw-bold"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Eliminar elemento */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <button 
            className="btn btn-outline-secondary text-white btn-sm mt-3"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Resumen de compra */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white border-secondary p-4 shadow-lg">
            <h4 className="fw-bold mb-3 text-white">Resumen</h4>
            <hr className="border-secondary" />
            
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Subtotal:</span>
              <span className="fw-bold text-white">${getCartTotal().toLocaleString('es-CL')} CLP</span>
            </div>
            
            <div className="d-flex justify-content-between mb-4">
              <span className="text-secondary">Envío Digital:</span>
              <span className="text-success fw-bold">GRATIS (Inmediato)</span>
            </div>

            <hr className="border-secondary" />

            <div className="d-flex justify-content-between mb-4 fs-5">
              <span className="fw-bold text-white">Total:</span>
              <span className="text-success fw-bold">${getCartTotal().toLocaleString('es-CL')} CLP</span>
            </div>

            <Link to="/checkout" className="btn btn-success fw-bold w-100 py-2">
              Proceder al Pago 💳
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};