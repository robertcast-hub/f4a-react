// src/utils/validators.js
// Reglas de validación reutilizadas por todos los formularios.

export const isRequired = (value) => String(value ?? '').trim().length > 0;

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email ?? '').trim());

/** Valida un RUN chileno con dígito verificador (módulo 11). Acepta 12.345.678-5 o 12345678-5 */
export const isValidRun = (run) => {
  const clean = String(run ?? '').replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i -= 1) {
    sum += Number(body[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const expected = 11 - (sum % 11);
  const dvCalc = expected === 11 ? '0' : expected === 10 ? 'K' : String(expected);
  return dv === dvCalc;
};

export const isValidPassword = (pw) => String(pw ?? '').length >= 6 && String(pw).length <= 20;

export const isPositiveNumber = (value) => value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0;

/* ---------- Validadores de formularios completos (devuelven objeto de errores) ---------- */

export const validateCustomer = (data) => {
  const errors = {};
  if (!isRequired(data.nombre)) errors.nombre = 'Ingresa tu nombre.';
  if (!isRequired(data.apellidos)) errors.apellidos = 'Ingresa tus apellidos.';
  if (!isValidEmail(data.email)) errors.email = 'Ingresa un correo válido.';
  if (!isRequired(data.calle)) errors.calle = 'Ingresa la calle y número.';
  if (!isRequired(data.region)) errors.region = 'Selecciona una región.';
  if (!isRequired(data.comuna)) errors.comuna = 'Selecciona una comuna.';
  return errors;
};

export const validateRegister = (data) => {
  const errors = {};
  if (!isValidRun(data.run)) errors.run = 'RUN inválido. Ej: 12345678-5';
  if (!isRequired(data.nombre)) errors.nombre = 'Ingresa tu nombre.';
  if (!isRequired(data.apellidos)) errors.apellidos = 'Ingresa tus apellidos.';
  if (!isValidEmail(data.email)) errors.email = 'Ingresa un correo válido.';
  if (!isValidPassword(data.password)) errors.password = 'La contraseña debe tener entre 6 y 20 caracteres.';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
  return errors;
};

export const validateProduct = (data) => {
  const errors = {};
  if (!isRequired(data.nombre)) errors.nombre = 'El nombre es obligatorio.';
  if (!isRequired(data.categoria)) errors.categoria = 'Selecciona una categoría.';
  if (!isPositiveNumber(data.precio) || Number(data.precio) === 0) errors.precio = 'El precio debe ser mayor a 0.';
  if (data.precioOferta !== '' && data.precioOferta != null) {
    if (!isPositiveNumber(data.precioOferta)) errors.precioOferta = 'Precio de oferta inválido.';
    else if (Number(data.precioOferta) >= Number(data.precio)) errors.precioOferta = 'La oferta debe ser menor al precio normal.';
  }
  if (!Number.isInteger(Number(data.stock)) || Number(data.stock) < 0) errors.stock = 'El stock debe ser un entero mayor o igual a 0.';
  if (!Number.isInteger(Number(data.stockCritico)) || Number(data.stockCritico) < 0) errors.stockCritico = 'El stock crítico debe ser un entero mayor o igual a 0.';
  return errors;
};

export const validateCategory = (data) => {
  const errors = {};
  if (!/^[a-z0-9-]{3,30}$/.test(String(data.id ?? ''))) errors.id = 'Usa de 3 a 30 letras minúsculas, números o guiones.';
  if (!isRequired(data.nombre)) errors.nombre = 'El nombre es obligatorio.';
  return errors;
};

export const validateUser = (data, { requirePassword = true } = {}) => {
  const errors = {};
  if (!isValidRun(data.run)) errors.run = 'RUN inválido. Ej: 12345678-5';
  if (!isRequired(data.nombre)) errors.nombre = 'Ingresa el nombre.';
  if (!isRequired(data.apellidos)) errors.apellidos = 'Ingresa los apellidos.';
  if (!isValidEmail(data.email)) errors.email = 'Correo inválido.';
  if ((requirePassword || data.password) && !isValidPassword(data.password)) errors.password = 'Entre 6 y 20 caracteres.';
  if (!['admin', 'cliente'].includes(data.rol)) errors.rol = 'Selecciona un rol.';
  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
