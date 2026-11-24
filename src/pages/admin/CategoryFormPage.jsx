// src/pages/admin/CategoryFormPage.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../data/dataService';
import { validateCategory, hasErrors } from '../../utils/validators';
import { FormField } from '../../components/common/FormField';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit ? categoryService.getById(id) : null;
  const [form, setForm] = useState(() => existing ?? { id: '', nombre: '', descripcion: '', imagen: '/imagenes/images.webp' });
  const [errors, setErrors] = useState({});

  if (isEdit && !existing) return <EmptyState title="Categoría no encontrada" actionTo="/admin/categorias" actionLabel="Volver" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCategory(form);
    if (!isEdit && categoryService.getById(form.id)) found.id = 'Ya existe una categoría con ese código.';
    setErrors(found);
    if (hasErrors(found)) return;
    if (isEdit) categoryService.update(id, form);
    else categoryService.create(form);
    navigate('/admin/categorias');
  };

  const field = (name) => ({ name, value: form[name], error: errors[name], onChange: handleChange });

  return (
    <>
      <PageTitle title={isEdit ? 'Editar categoría' : 'Nueva categoría'} />
      <form noValidate onSubmit={handleSubmit} className="admin-panel p-3 p-md-4 row g-3 mx-0">
        <FormField label="Código" required className="col-md-4" readOnly={isEdit}
          hint="Se usa en la URL, ej: juegos-retro" {...field('id')} />
        <FormField label="Nombre" required className="col-md-8" {...field('nombre')} />
        <FormField label="Descripción" as="textarea" {...field('descripcion')} />
        <FormField label="Ruta de imagen" {...field('imagen')} />
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-success">{isEdit ? 'Guardar cambios' : 'Crear categoría'}</button>
          <button type="button" className="btn btn-outline-light" onClick={() => navigate('/admin/categorias')}>Cancelar</button>
        </div>
      </form>
    </>
  );
};
