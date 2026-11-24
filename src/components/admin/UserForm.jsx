// src/components/admin/UserForm.jsx
import { useState } from 'react';
import { FormField } from '../common/FormField';
import { regionService } from '../../data/dataService';
import { validateUser, hasErrors } from '../../utils/validators';

const empty = { run: '', nombre: '', apellidos: '', email: '', password: '', rol: 'cliente', region: '', comuna: '', direccion: '' };

export const UserForm = ({ initialValues, onSubmit, onCancel, isEdit = false, lockRole = false }) => {
  const [form, setForm] = useState(() => ({ ...empty, ...initialValues, password: '' }));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => (name === 'region' ? { ...prev, region: value, comuna: '' } : { ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateUser(form, { requirePassword: !isEdit });
    setErrors(found);
    if (hasErrors(found)) return;
    const data = { ...form };
    if (isEdit && !data.password) delete data.password; // conserva la contraseña actual
    onSubmit(data, setErrors);
  };

  const field = (name) => ({ name, value: form[name], error: errors[name], onChange: handleChange });

  return (
    <form noValidate onSubmit={handleSubmit} className="row g-3" aria-label="Formulario de usuario">
      <FormField label="RUN" required className="col-md-4" placeholder="12345678-5" {...field('run')} />
      <FormField label="Nombre" required className="col-md-4" {...field('nombre')} />
      <FormField label="Apellidos" required className="col-md-4" {...field('apellidos')} />
      <FormField label="Correo" type="email" required className="col-md-6" {...field('email')} />
      <FormField label={isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'} type="password" required={!isEdit}
        className="col-md-3" {...field('password')} />
      <FormField label="Rol" as="select" required className="col-md-3" readOnly={lockRole}
        options={[{ value: 'cliente', label: 'Cliente' }, { value: 'admin', label: 'Administrador' }]} {...field('rol')} />
      <FormField label="Región" as="select" className="col-md-4" options={regionService.getAll().map((r) => r.nombre)} {...field('region')} />
      <FormField label="Comuna" as="select" className="col-md-4" options={regionService.getComunas(form.region)} {...field('comuna')} />
      <FormField label="Dirección" className="col-md-4" {...field('direccion')} />
      <div className="col-12 d-flex gap-2">
        <button type="submit" className="btn btn-success">{isEdit ? 'Guardar cambios' : 'Crear usuario'}</button>
        {onCancel && <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};
