import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('asocia la etiqueta al input y propaga el cambio', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<FormField label="Nombre" name="nombre" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('marca el campo como inválido y muestra el error', () => {
    render(<FormField label="Correo" name="email" value="x" onChange={() => {}} error="Correo inválido" />);
    const input = screen.getByLabelText('Correo');
    expect(input.className).toContain('is-invalid');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByText('Correo inválido')).toBeTruthy();
  });

  it('renderiza un select con las opciones entregadas', () => {
    render(<FormField label="Región" name="region" as="select" options={['A', { value: 'b', label: 'B' }]} value="" onChange={() => {}} />);
    const options = screen.getAllByRole('option').map((o) => o.textContent);
    expect(options).toEqual(['Selecciona…', 'A', 'B']);
  });
});
