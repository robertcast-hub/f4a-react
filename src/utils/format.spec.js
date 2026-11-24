import { formatCLP, formatDate, discountPercent } from './format';

describe('format', () => {
  it('formatCLP usa separador de miles chileno', () => {
    expect(formatCLP(29990)).toBe('$29.990');
    expect(formatCLP('abc')).toBe('$0');
  });

  it('formatDate devuelve dd-mm-aaaa y cadena vacía si la fecha es inválida', () => {
    expect(formatDate('2026-11-02T14:20:00.000Z')).toMatch(/0?2-11-2026/);
    expect(formatDate('no-es-fecha')).toBe('');
  });

  it('discountPercent calcula el porcentaje solo cuando hay rebaja real', () => {
    expect(discountPercent(10000, 7500)).toBe(25);
    expect(discountPercent(10000, null)).toBe(0);
    expect(discountPercent(10000, 12000)).toBe(0);
  });
});
