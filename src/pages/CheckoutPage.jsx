// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rut: '',
    metodoPago: 'webpay'
  });

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No tienes productos en tu carrito para pagar</h2>
        <Link to="/" className="btn btn-success mt-3">Volver a la tienda</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular resultado de pago (90% éxito, 10% error para pruebas)
    const esExitoso = true; // Cambiar a false si quieres probar el flujo de error

    if (esExitoso) {
      const orderData = {
        id: 'F4A-' + Math.floor(100000 + Math.random() * 900000),
        cliente: formData,
        items: cart,
        total: getCartTotal(),
        fecha: new Date().toLocaleDateString('es-CL')
      };
      localStorage.setItem('f4a_last_order', JSON.stringify(orderData));
      clearCart();
      navigate('/compra-exitosa');
    } else {
      navigate('/pago-fallido');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-success border-bottom border-secondary pb-2 mb-4">💳 Finalizar Compra</h2>
      <div className="row g-4">
        {/* Formulario de datos */}
        <div className="col-lg-7">
          <div className="bg-dark p-4 rounded border border-secondary text-white">
            <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2">Datos del Comprador</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-black text-white border-secondary"
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo Electrónico (donde recibirás tus claves)</label>
                <input
                  type="email"
                  name="email"
                  className="form-control bg-black text-white border-secondary"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">RUT / Identificación</label>
                <input
                  type="text"
                  name="rut"
                  className="form-control bg-black text-white border-secondary"
                  placeholder="12.345.678-K"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                />
              </div>

              <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2 pt-2">Método de Pago</h4>
              <div className="d-flex flex-column gap-2 mb-4">
                <div className="form-check bg-black p-3 rounded border border-secondary d-flex align-items-center justify-content-between ms-0">
                  <div>
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="metodoPago"
                      id="webpay"
                      value="webpay"
                      checked={formData.metodoPago === 'webpay'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-bold" htmlFor="webpay">Webpay Plus (Débito/Crédito)</label>
                  </div>
                  <img src="/imagenes/pago/webpay.png" alt="Webpay" height="25" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
                </div>

                <div className="form-check bg-black p-3 rounded border border-secondary d-flex align-items-center justify-content-between ms-0">
                  <div>
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="metodoPago"
                      id="paypal"
                      value="paypal"
                      checked={formData.metodoPago === 'paypal'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-bold" htmlFor="paypal">PayPal</label>
                  </div>
                  <img src="/imagenes/pago/paypal.png" alt="PayPal" height="25" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
                </div>

                <div className="form-check bg-black p-3 rounded border border-secondary d-flex align-items-center justify-content-between ms-0">
                  <div>
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="metodoPago"
                      id="mercadopago"
                      value="mercadopago"
                      checked={formData.metodoPago === 'mercadopago'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-bold" htmlFor="mercadopago">MercadoPago</label>
                  </div>
                  <img src="/imagenes/pago/mercadopago.png" alt="MercadoPago" height="25" className="bg-white p-1 rounded" onError={(e) => e.target.style.display='none'} />
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 fw-bold py-3">
                Pagar ${getCartTotal().toLocaleString('es-CL')} CLP
              </button>
            </form>
          </div>
        </div>

        {/* Resumen de orden */}
        <div className="col-lg-5">
          <div className="bg-dark p-4 rounded border border-secondary text-white">
            <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2">Resumen de la Orden</h4>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center border-secondary px-0">
                  <div>
                    <h6 className="my-0 small fw-bold">{item.nombre}</h6>
                    <small className="text-muted">Cant: {item.quantity}</small>
                  </div>
                  <span className="text-success fw-bold">${(item.precio * item.quantity).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between border-top border-secondary pt-3 fs-5">
              <span>Total:</span>
              <span className="text-success fw-bold">${getCartTotal().toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};