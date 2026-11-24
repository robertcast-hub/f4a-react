// src/pages/store/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { precioFinal } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { QuantitySelector } from '../../components/products/QuantitySelector';
import { EmptyState } from '../../components/common/EmptyState';
import { PageTitle } from '../../components/common/PageTitle';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();

  if (!cart.length) {
    return (
      <div className="container">
        <EmptyState title="Tu carrito está vacío" text="Agrega juegos, licencias o suscripciones para comprarlos."
          actionTo="/productos" actionLabel="Ir al catálogo" />
      </div>
    );
  }

  return (
    <div className="container">
      <PageTitle title="Carrito de compras" />
      <div className="row g-4">
        <div className="col-lg-8">
          <ul className="list-unstyled d-flex flex-column gap-3 mb-3">
            {cart.map((item) => (
              <li key={item.id} className="cart-row d-flex flex-wrap align-items-center gap-3 p-3">
                <img src={item.imagen} alt="" width="72" height="72" className="rounded object-fit-cover" />
                <div className="flex-grow-1">
                  <p className="fw-bold mb-1">{item.nombre}</p>
                  <span className="small">{formatCLP(precioFinal(item))} c/u</span>
                </div>
                <QuantitySelector
                  value={item.quantity}
                  min={0}
                  max={Number(item.stock) || 99}
                  label={`Cantidad de ${item.nombre}`}
                  onChange={(q) => updateQuantity(item.id, q)}
                />
                <span className="fw-bold text-end" style={{ minWidth: 90 }}>{formatCLP(precioFinal(item) * item.quantity)}</span>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={clearCart}>Vaciar carrito</button>
        </div>
        <aside className="col-lg-4">
          <div className="summary-box p-4">
            <h2 className="h5 fw-bold">Resumen</h2>
            <div className="d-flex justify-content-between"><span>Entrega</span><span>Digital, sin costo</span></div>
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
              <span>Total</span><span data-testid="cart-total">{formatCLP(total)}</span>
            </div>
            <Link to="/checkout" className="btn btn-success w-100">Comprar ahora</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};
