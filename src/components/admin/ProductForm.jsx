// src/components/admin/ProductForm.jsx
// Formulario de producto reutilizado para "Nuevo producto" y "Editar producto".
// No guarda nada por sí mismo: valida y entrega los datos al padre mediante onSubmit.
import { useState } from 'react';
import { FormField } from '../common/FormField';
import { validateProduct, hasErrors } from '../../utils/validators';

const emptyProduct = {
  nombre: '', categoria: '', precio: '', precioOferta: '', stock: '', stockCritico: '5',
  imagen: '/imagenes/images.webp', descripcion: '', destacado: false,
};

export const ProductForm = ({ initialValues = emptyProduct, categories, onSubmit, onCancel, submitLabel = 'Guardar producto' }) => {
  const [form, setForm] = useState(() => ({
    ...emptyProduct,
    ...initialValues,
    precioOferta: initialValues.precioOferta ?? '',
  }));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateProduct(form);
    setErrors(found);
    if (hasErrors(found)) return;
    onSubmit({
      ...form,
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      precioOferta: form.precioOferta === '' ? null : Number(form.precioOferta),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico),
    });
  };

  const field = (name) => ({ name, value: form[name], error: errors[name], onChange: handleChange });

  return (
    <form noValidate onSubmit={handleSubmit} className="row g-3" aria-label="Formulario de producto">
      <FormField label="Nombre" required className="col-md-8" {...field('nombre')} />
      <FormField label="Categoría" as="select" required className="col-md-4"
        options={categories.map((c) => ({ value: c.id, label: c.nombre }))} {...field('categoria')} />
      <FormField label="Precio (CLP)" type="number" min="0" required className="col-6 col-md-3" {...field('precio')} />
      <FormField label="Precio oferta (opcional)" type="number" min="0" className="col-6 col-md-3" {...field('precioOferta')} />
      <FormField label="Stock" type="number" min="0" required className="col-6 col-md-3" {...field('stock')} />
      <FormField label="Stock crítico" type="number" min="0" required className="col-6 col-md-3"
        hint="Bajo este valor aparece en críticos." {...field('stockCritico')} />
      <FormField label="Ruta de imagen" className="col-md-6" {...field('imagen')} />
      <FormField label="Descripción" as="textarea" className="col-md-6" {...field('descripcion')} />
      <div className="col-12 form-check ms-2">
        <input id="field-destacado" name="destacado" type="checkbox" className="form-check-input"
          checked={form.destacado} onChange={handleChange} />
        <label htmlFor="field-destacado" className="form-check-label">Mostrar en destacados</label>
      </div>
      <div className="col-12 d-flex gap-2">
        <button type="submit" className="btn btn-success">{submitLabel}</button>
        {onCancel && <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};
