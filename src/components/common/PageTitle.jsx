// src/components/common/PageTitle.jsx
export const PageTitle = ({ title, subtitle, children }) => (
  <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4 page-title">
    <div>
      <h1 className="h2 fw-bold mb-1">{title}</h1>
      {subtitle && <p className="text-secondary-emphasis mb-0">{subtitle}</p>}
    </div>
    {children && <div className="d-flex flex-wrap gap-2">{children}</div>}
  </div>
);
