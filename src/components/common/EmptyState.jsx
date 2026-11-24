// src/components/common/EmptyState.jsx
import { Link } from 'react-router-dom';

export const EmptyState = ({ title, text, actionTo, actionLabel }) => (
  <div className="empty-state text-center py-5 px-3">
    <h2 className="h4 fw-bold">{title}</h2>
    {text && <p className="text-secondary-emphasis mb-4">{text}</p>}
    {actionTo && <Link to={actionTo} className="btn btn-success">{actionLabel}</Link>}
  </div>
);
