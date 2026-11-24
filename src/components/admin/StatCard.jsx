// src/components/admin/StatCard.jsx
export const StatCard = ({ label, value, detail, tone = 'primary' }) => (
  <div className={`stat-card stat-card--${tone} p-3 h-100`}>
    <p className="mb-1 small fw-semibold">{label}</p>
    <p className="fs-2 fw-bold mb-0" data-testid={`stat-${label}`}>{value}</p>
    {detail && <p className="small mb-0 opacity-75">{detail}</p>}
  </div>
);
