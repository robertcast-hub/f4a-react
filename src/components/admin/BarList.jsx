// src/components/admin/BarList.jsx
// Gráfico de barras horizontal hecho solo con Bootstrap (progress), sin librerías extra.
export const BarList = ({ data, valueKey, labelKey, format = (v) => v }) => {
  const max = Math.max(1, ...data.map((d) => d[valueKey]));
  return (
    <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
      {data.map((d) => (
        <li key={d[labelKey]}>
          <div className="d-flex justify-content-between small mb-1">
            <span>{d[labelKey]}</span><strong>{format(d[valueKey])}</strong>
          </div>
          <div className="progress" role="progressbar" aria-label={d[labelKey]}
            aria-valuenow={d[valueKey]} aria-valuemin={0} aria-valuemax={max} style={{ height: 8 }}>
            <div className="progress-bar bg-success" style={{ width: `${(d[valueKey] / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};
