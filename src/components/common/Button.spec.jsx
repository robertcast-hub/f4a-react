// Pruebas de PROPS: el botón recibe correctamente la etiqueta y la función onClick
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('muestra la etiqueta recibida por props', () => {
    render(<Button label="Comprar ahora" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Comprar ahora' })).toBeTruthy();
  });

  it('ejecuta la función onClick recibida al hacer clic (mock con jasmine.createSpy)', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button label="Pagar" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pagar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando está deshabilitado', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button label="Pagar" onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('aplica la variante y el tamaño como clases de Bootstrap', () => {
    render(<Button label="X" variant="danger" size="sm" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('btn-danger');
    expect(btn.className).toContain('btn-sm');
    expect(btn.getAttribute('type')).toBe('button');
  });
});
