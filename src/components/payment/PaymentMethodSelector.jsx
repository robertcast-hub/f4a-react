// src/components/payment/PaymentMethodSelector.jsx
// Lista de medios de pago (radio buttons). Componente controlado: el valor vive en el padre.
import { PAYMENT_METHODS } from '../../utils/payment';

export const PaymentMethodSelector = ({ value, onChange, error }) => (
  <fieldset className="mt-4">
    <legend className="h5 fw-bold">Medio de pago</legend>
    <div className="row row-cols-1 row-cols-md-2 g-2" role="radiogroup" aria-label="Medio de pago">
      {PAYMENT_METHODS.map((m) => (
        <div className="col" key={m.id}>
          <label className={`pay-option d-flex align-items-center gap-3 p-3 h-100 ${value === m.id ? 'is-selected' : ''}`}>
            <input
              type="radio"
              name="metodoPago"
              value={m.id}
              checked={value === m.id}
              onChange={() => onChange(m.id)}
              className="form-check-input mt-0"
            />
            <img src={m.logo} alt="" height="28" className="bg-white rounded p-1" />
            <span>
              <span className="d-block fw-semibold">{m.nombre}</span>
              <span className="small text-secondary-emphasis">{m.descripcion}</span>
            </span>
          </label>
        </div>
      ))}
    </div>
    {error && <div className="text-danger small mt-2" role="alert">{error}</div>}
  </fieldset>
);
