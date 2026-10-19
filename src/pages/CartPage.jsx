// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3">Tu carrito está vacío 🛒</h2>
        <p className="text-muted">Explora nuestro catálogo y agrega tus juegos o licencias favoritas.</p>
        <Link to="/" className="btn btn-success mt-3">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-success border-bottom border-secondary pb-2 mb-4">🛒 Tu Carrito de Compras</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.imagen} alt={item.nombre} width="50" height="40" className="rounded object-fit-cover" />
                        <span className="fw-semibold">{item.nombre}</span>
                      </div>
                    </td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="form-control form-control-sm bg-dark text-white border-secondary w-auto"
                      />
                    </td>
                    <td className="text-success fw-bold">${(item.precio * item.quantity).toLocaleString('es-CL')}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-outline-danger">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={clearCart} className="btn btn-outline-warning btn-sm">Vaciar Carrito</button>
        </div>

        <div className="col-lg-4">
          <div className="bg-dark p-4 rounded border border-secondary">
            <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2">Resumen</h4>
            <div className="d-flex justify-content-between mb-3 fs-5">
              <span>Total:</span>
              <span className="text-success fw-bold">${getCartTotal().toLocaleString('es-CL')} CLP</span>
            </div>
            <Link to="/checkout" className="btn btn-success w-100 btn-lg fw-semibold">
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};