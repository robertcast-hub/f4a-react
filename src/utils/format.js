// src/utils/format.js
export const formatCLP = (value) =>
  `$${Math.round(Number(value) || 0).toLocaleString('es-CL')}`;

export const formatDate = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const discountPercent = (precio, precioOferta) => {
  if (precioOferta == null || !precio || precioOferta >= precio) return 0;
  return Math.round(((precio - precioOferta) / precio) * 100);
};
