// Formulario: estado al escribir, validación y envío de datos normalizados
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductForm } from './ProductForm';

const categories = [{ id: 'gaming', nombre: 'Juegos' }];
const type = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('ProductForm', () => {
  it('el estado del formulario cambia cuando el usuario escribe', () => {
    render(<ProductForm categories={categories} onSubmit={() => {}} />);
    type(/^Nombre/, 'Hollow Knight');
    expect(screen.getByLabelText(/^Nombre/).value).toBe('Hollow Knight');
  });

  it('con datos inválidos muestra errores y NO llama a onSubmit', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<ProductForm categories={categories} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El precio debe ser mayor a 0.')).toBeTruthy();
  });

  it('con datos válidos llama a onSubmit con números convertidos y oferta null', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<ProductForm categories={categories} onSubmit={onSubmit} />);
    type(/^Nombre/, '  Hollow Knight  ');
    fireEvent.change(screen.getByLabelText(/Categoría/), { target: { value: 'gaming' } });
    type(/^Precio \(CLP\)/, '1499');
    type(/^Stock\W*$/, '10');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));
    expect(onSubmit).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Hollow Knight', categoria: 'gaming', precio: 1499, stock: 10, stockCritico: 5, precioOferta: null,
    }));
  });

  it('en modo edición carga los valores iniciales y el botón cancelar llama a onCancel', () => {
    const onCancel = jasmine.createSpy('onCancel');
    render(<ProductForm categories={categories} onSubmit={() => {}} onCancel={onCancel}
      initialValues={{ nombre: 'Celeste', categoria: 'gaming', precio: 5000, precioOferta: 4000, stock: 3, stockCritico: 1 }} />);
    expect(screen.getByLabelText(/^Nombre/).value).toBe('Celeste');
    expect(screen.getByLabelText(/Precio oferta/).value).toBe('4000');
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
