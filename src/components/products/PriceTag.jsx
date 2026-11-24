// src/components/products/PriceTag.jsx
import { formatCLP, discountPercent } from '../../utils/format';

export const PriceTag = ({ precio, precioOferta, size = 'md' }) => {
  const descuento = discountPercent(precio, precioOferta);
  const big = size === 'lg';
  if (!descuento) {
    return <span className={`price ${big ? 'fs-3' : 'fs-5'}`}>{formatCLP(precio)}</span>;
  }
  return (
    <span className="d-inline-flex flex-wrap align-items-baseline gap-2">
      <span className={`price ${big ? 'fs-3' : 'fs-5'}`}>{formatCLP(precioOferta)}</span>
      <del className="text-secondary-emphasis small" aria-label={`Precio normal ${formatCLP(precio)}`}>
        {formatCLP(precio)}
      </del>
      <span className="badge text-bg-danger">-{descuento}%</span>
    </span>
  );
};
