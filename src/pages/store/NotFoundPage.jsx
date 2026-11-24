// src/pages/store/NotFoundPage.jsx
import { EmptyState } from '../../components/common/EmptyState';

export const NotFoundPage = () => (
  <div className="container">
    <EmptyState title="Página no encontrada" text="La dirección no existe o cambió." actionTo="/" actionLabel="Ir al inicio" />
  </div>
);
