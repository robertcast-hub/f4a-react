// src/components/common/Button.jsx
// Botón reutilizable: recibe la etiqueta y la función onClick por props.
export const Button = ({
  label,
  onClick,
  variant = 'success',
  type = 'button',
  size,
  disabled = false,
  className = '',
  ...rest
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`.trim()}
    {...rest}
  >
    {label}
  </button>
);
