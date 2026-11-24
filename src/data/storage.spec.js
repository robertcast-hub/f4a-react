// Persistencia: versión de las claves y limpieza de datos de la versión anterior
import { storage, cleanLegacyStorage, KEYS } from './storage';

describe('storage', () => {
  it('todas las claves llevan la versión v3', () => {
    Object.values(KEYS).forEach((key) => expect(key).toMatch(/^f4a_v3_/));
  });

  it('cleanLegacyStorage borra los datos de la versión 2.x y conserva los nuevos', () => {
    localStorage.setItem('f4a_products', '[{"id":"1","title":"viejo"}]');
    localStorage.setItem('f4a_cart', '[]');
    storage.write(KEYS.cart, [{ id: 'P001', quantity: 1 }]);
    expect(cleanLegacyStorage()).toBe(2);
    expect(localStorage.getItem('f4a_products')).toBeNull();
    expect(storage.read(KEYS.cart, [])).toEqual([{ id: 'P001', quantity: 1 }]);
  });

  it('read devuelve el valor por defecto si el dato está corrupto', () => {
    localStorage.setItem('clave-rota', '{no es json');
    expect(storage.read('clave-rota', 'defecto')).toBe('defecto');
  });
});
