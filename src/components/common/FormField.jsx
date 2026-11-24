// src/components/common/FormField.jsx
// Campo de formulario Bootstrap con etiqueta, validación visual y mensaje de error.
export const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  as = 'input',
  options = [],
  required = false,
  readOnly = false,
  placeholder,
  className = 'col-12',
  hint,
  ...rest
}) => {
  const id = `field-${name}`;
  const control = `${as === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`;
  const common = {
    id,
    name,
    value: value ?? '',
    onChange,
    readOnly,
    disabled: readOnly && as === 'select',
    placeholder,
    className: control,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    ...rest,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger ms-1" aria-hidden="true">*</span>}
      </label>
      {as === 'select' && (
        <select {...common}>
          <option value="">Selecciona…</option>
          {options.map((opt) => {
            const optValue = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return <option key={optValue} value={optValue}>{optLabel}</option>;
          })}
        </select>
      )}
      {as === 'textarea' && <textarea rows={3} {...common} />}
      {as === 'input' && <input type={type} {...common} />}
      {hint && !error && <div className="form-text">{hint}</div>}
      {error && <div id={`${id}-error`} className="invalid-feedback">{error}</div>}
    </div>
  );
};
