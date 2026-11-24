// src/components/common/Alert.jsx
// Mensaje con renderizado condicional: si no hay mensaje, no se dibuja nada.
export const Alert = ({ message, variant = 'info', onClose }) => {
  if (!message) return null;
  return (
    <div className={`alert alert-${variant} d-flex justify-content-between align-items-start gap-2`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="btn-close" aria-label="Cerrar mensaje" onClick={onClose} />
      )}
    </div>
  );
};

export const ErrorMessage = ({ error, onClose }) => (
  <Alert message={error} variant="danger" onClose={onClose} />
);
