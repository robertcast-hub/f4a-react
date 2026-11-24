// Pruebas de lógica pura: reglas de validación de formularios
import {
  isRequired, isValidEmail, isValidRun, isValidPassword,
  validateCustomer, validateRegister, validateProduct, validateCategory, validateUser, hasErrors,
} from './validators';

describe('validators', () => {
  it('isRequired rechaza vacíos y espacios', () => {
    expect(isRequired('')).toBeFalse();
    expect(isRequired('   ')).toBeFalse();
    expect(isRequired(null)).toBeFalse();
    expect(isRequired('hola')).toBeTrue();
  });

  it('isValidEmail acepta correos válidos y rechaza inválidos', () => {
    expect(isValidEmail('pedro@duoc.cl')).toBeTrue();
    expect(isValidEmail('pedro@duoc')).toBeFalse();
    expect(isValidEmail('sin-arroba.cl')).toBeFalse();
  });

  it('isValidRun valida el dígito verificador (módulo 11)', () => {
    expect(isValidRun('12345678-5')).toBeTrue();
    expect(isValidRun('12.345.678-5')).toBeTrue();
    expect(isValidRun('12345678-K')).toBeFalse();
    expect(isValidRun('abc')).toBeFalse();
  });

  it('isValidPassword exige entre 6 y 20 caracteres', () => {
    expect(isValidPassword('12345')).toBeFalse();
    expect(isValidPassword('123456')).toBeTrue();
    expect(isValidPassword('x'.repeat(21))).toBeFalse();
  });

  it('validateCustomer marca todos los campos obligatorios faltantes', () => {
    const errors = validateCustomer({});
    expect(Object.keys(errors)).toEqual(jasmine.arrayContaining(['nombre', 'apellidos', 'email', 'calle', 'region', 'comuna']));
  });

  it('validateCustomer no devuelve errores con datos completos', () => {
    const ok = { nombre: 'Ana', apellidos: 'Díaz', email: 'ana@x.cl', calle: 'A 1', region: 'R', comuna: 'C' };
    expect(hasErrors(validateCustomer(ok))).toBeFalse();
  });

  it('validateRegister detecta contraseñas distintas', () => {
    const errors = validateRegister({ run: '12345678-5', nombre: 'A', apellidos: 'B', email: 'a@b.cl', password: '123456', confirmPassword: '654321' });
    expect(errors).toEqual({ confirmPassword: 'Las contraseñas no coinciden.' });
  });

  it('validateProduct exige que la oferta sea menor al precio', () => {
    const base = { nombre: 'X', categoria: 'gaming', precio: '1000', stock: '1', stockCritico: '1' };
    expect(validateProduct({ ...base, precioOferta: '2000' }).precioOferta).toContain('menor');
    expect(hasErrors(validateProduct({ ...base, precioOferta: '' }))).toBeFalse();
  });

  it('validateProduct rechaza stock negativo o decimal y precio 0', () => {
    const errors = validateProduct({ nombre: 'X', categoria: 'g', precio: '0', stock: '-1', stockCritico: '1.5' });
    expect(errors.precio).toBeDefined();
    expect(errors.stock).toBeDefined();
    expect(errors.stockCritico).toBeDefined();
  });

  it('validateCategory exige un código en formato slug', () => {
    expect(validateCategory({ id: 'Juegos Retro', nombre: 'x' }).id).toBeDefined();
    expect(hasErrors(validateCategory({ id: 'juegos-retro', nombre: 'Juegos retro' }))).toBeFalse();
  });

  it('validateUser permite omitir la contraseña al editar', () => {
    const data = { run: '12345678-5', nombre: 'A', apellidos: 'B', email: 'a@b.cl', password: '', rol: 'cliente' };
    expect(validateUser(data, { requirePassword: true }).password).toBeDefined();
    expect(validateUser(data, { requirePassword: false }).password).toBeUndefined();
  });
});
