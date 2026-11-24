// src/pages/store/CheckoutPage.jsx
// Paso de pago: datos del cliente + dirección. Si hay sesión, se completan automáticamente.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, precioFinal } from '../../data/dataService';
import { validateCustomer, hasErrors } from '../../utils/validators';
import { formatCLP } from '../../utils/format';
import { CustomerForm } from '../../components/orders/CustomerForm';
import { OrderItemsTable } from '../../components/orders/OrderItemsTable';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/Alert';

const emptyCustomer = { nombre: '', apellidos: '', email: '', calle: '', departamento: '', region: '', comuna: '', indicaciones: '' };

export const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si el usuario inició sesión, su información se añade de forma automática
  const [cliente, setCliente] = useState(() =>
    user
      ? { ...emptyCustomer, nombre: user.nombre, apellidos: user.apellidos, email: user.email,
          calle: user.direccion ?? '', region: user.region ?? '', comuna: user.comuna ?? '' }
      : emptyCustomer,
  );
  const [errors, setErrors] = useState({});
  const [simularRechazo, setSimularRechazo] = useState(false);

  if (!cart.length) {
    return (
      <div className="container">
        <EmptyState title="No hay productos para pagar" actionTo="/productos" actionLabel="Ir al catálogo" />
      </div>
    );
  }

  const items = cart.map((p) => ({ id: p.id, nombre: p.nombre, precioUnitario: precioFinal(p), cantidad: p.quantity }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCustomer(cliente);
    setErrors(found);
    if (hasErrors(found)) return;

    const order = orderService.checkout({ cliente, cart, usuarioId: user?.id ?? null, simularRechazo });
    if (order.estado === 'pagada') {
      clearCart();
      navigate(`/compra/exito/${order.id}`);
    } else {
      navigate(`/compra/error/${order.id}`);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className="checkout p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <h1 className="h3 fw-bold mb-0">Finalizar compra</h1>
            <p className="small mb-0">Completa tus datos para recibir los productos.</p>
          </div>
          <span className="badge text-bg-primary fs-6">Total a pagar: {formatCLP(total)}</span>
        </div>
        <OrderItemsTable items={items} />
        <form noValidate onSubmit={handleSubmit} className="mt-4">
          <ErrorMessage error={hasErrors(errors) ? 'Revisa los campos marcados en rojo.' : ''} />
          <CustomerForm data={cliente} errors={errors} onChange={setCliente} />
          <div className="form-check mt-4">
            <input id="simular-rechazo" type="checkbox" className="form-check-input"
              checked={simularRechazo} onChange={(e) => setSimularRechazo(e.target.checked)} />
            <label htmlFor="simular-rechazo" className="form-check-label small">
              Modo demostración: simular pago rechazado
            </label>
          </div>
          <div className="text-end mt-3">
            <button type="submit" className="btn btn-success btn-lg">Pagar ahora {formatCLP(total)}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
