// src/components/products/QuantitySelector.jsx
export const QuantitySelector = ({ value, onChange, min = 1, max = 99, label = 'Cantidad' }) => (
  <div className="input-group input-group-sm quantity" role="group" aria-label={label}>
    <button
      type="button"
      className="btn btn-outline-secondary"
      aria-label="Disminuir cantidad"
      disabled={value <= min}
      onClick={() => onChange(value - 1)}
    >
      −
    </button>
    <span className="input-group-text justify-content-center" data-testid="quantity-value">{value}</span>
    <button
      type="button"
      className="btn btn-outline-secondary"
      aria-label="Aumentar cantidad"
      disabled={value >= max}
      onClick={() => onChange(value + 1)}
    >
      +
    </button>
  </div>
);
