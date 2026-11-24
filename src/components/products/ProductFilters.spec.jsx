// Componente controlado: verifica que comunique los cambios de estado al padre
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilters } from './ProductFilters';

const categories = [{ id: 'gaming', nombre: 'Juegos' }, { id: 'software', nombre: 'Software' }];
const filters = { query: '', categoria: '', orden: '' };

describe('ProductFilters', () => {
  it('llama a onChange con el texto escrito, sin perder los otros filtros', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<ProductFilters filters={{ ...filters, orden: 'nombre' }} categories={categories} onChange={onChange} resultCount={0} />);
    fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'gta' } });
    expect(onChange).toHaveBeenCalledWith({ query: 'gta', categoria: '', orden: 'nombre' });
  });

  it('lista una opción por categoría más "Todas"', () => {
    render(<ProductFilters filters={filters} categories={categories} onChange={() => {}} resultCount={2} />);
    const select = screen.getByLabelText('Categoría');
    expect(select.querySelectorAll('option').length).toBe(3);
    expect(screen.getByText('2 resultados')).toBeTruthy();
  });

  it('integrado con un estado real, el input refleja lo que el usuario escribe', () => {
    const Wrapper = () => {
      const [f, setF] = useState(filters);
      return <ProductFilters filters={f} categories={categories} onChange={setF} resultCount={1} />;
    };
    render(<Wrapper />);
    const input = screen.getByLabelText('Buscar');
    fireEvent.change(input, { target: { value: 'minecraft' } });
    expect(input.value).toBe('minecraft');
    expect(screen.getByText('1 resultado')).toBeTruthy();
  });
});
