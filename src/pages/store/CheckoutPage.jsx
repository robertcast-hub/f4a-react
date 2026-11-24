// src/pages/store/CheckoutPage.jsx
// Checkout en dos pasos:
//  1. Datos del cliente, dirección y medio de pago (si hay sesión, los datos se completan solos).
//  2. Pasarela de pago simulada del medio elegido. Su resultado decide si la orden queda pagada o rechazada.
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, precioFinal } from '../../data/dataService';
import { validateCustomer, hasErrors } from '../../utils/validators';
import { formatCLP } from '../../utils/format';
import { CustomerForm } from '../../components/orders/CustomerForm';
import { OrderItemsTable } from '../../components/orders/OrderItemsTable';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/Alert';
import { PaymentMethodSelector } from '../../components/payment/PaymentMethodSelector';
import { PaymentGateway } from '../../components/payment/PaymentGateway';

const emptyCustomer = { nombre: '', apellidos: '', email: '', calle: '', departamento: '', region: '', comuna: '', indicaciones: '' };

export const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Si viene de un pago rechazado, se reutilizan los datos ya ingresados.
  // Si no, y el usuario inició sesión, su información se añade de forma automática.
  const [cliente, setCliente] = useState(() =>
    location.state?.cliente
      ? { ...emptyCustomer, ...location.state.cliente }
      : user
      ? { ...emptyCustomer, nombre: user.nombre, apellidos: user.apellidos, email: user.email,
          calle: user.direccion ?? '', region: user.region ?? '', comuna: user.comuna ?? '' }
      : emptyCustomer,
  );
  const [errors, setErrors] = useState({});
  const [metodo, setMetodo] = useState('');
  const [step, setStep] = useState('datos'); // 'datos' | 'pago'

  if (!cart.length) {
    return (
      <div className="container">
        <EmptyState title="No hay productos para pagar" actionTo="/productos" actionLabel="Ir al catálogo" />
      </div>
    );
  }

  const items = cart.map((p) => ({ id: p.id, nombre: p.nombre, precioUnitario: precioFinal(p), cantidad: p.quantity }));

  // Paso 1 → 2: valida los datos y abre la pasarela del medio elegido
  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCustomer(cliente);
    if (!metodo) found.metodo = 'Selecciona un medio de pago.';
    setErrors(found);
    if (hasErrors(found)) return;
    setStep('pago');
  };

  // Resultado de la pasarela → se registra la orden (pagada o rechazada)
  const handlePaymentResult = (pago) => {
    const order = orderService.checkout({ cliente, cart, usuarioId: user?.id ?? null, pago });
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
        {step === 'pago' ? (
          <div className="mt-4">
            <PaymentGateway
              methodId={metodo}
              total={total}
              email={cliente.email}
              onResult={handlePaymentResult}
              onCancel={() => setStep('datos')}
            />
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="mt-4">
            <ErrorMessage error={hasErrors(errors) ? 'Revisa los campos marcados en rojo.' : ''} />
            <CustomerForm data={cliente} errors={errors} onChange={setCliente} />
            <PaymentMethodSelector value={metodo} onChange={setMetodo} error={errors.metodo} />
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-success btn-lg">Pagar ahora {formatCLP(total)}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
