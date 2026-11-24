// src/pages/store/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, regionService } from '../../data/dataService';
import { validateRegister, hasErrors } from '../../utils/validators';
import { FormField } from '../../components/common/FormField';
import { Alert, ErrorMessage } from '../../components/common/Alert';

const initial = { run: '', nombre: '', apellidos: '', email: '', password: '', confirmPassword: '', region: '', comuna: '', direccion: '' };

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [ok, setOk] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => (name === 'region' ? { ...prev, region: value, comuna: '' } : { ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateRegister(form);
    setErrors(found);
    if (hasErrors(found)) return;
    const { confirmPassword: _c, ...data } = form;
    const result = authService.register(data);
    if (!result.ok) {
      setServerError(result.error);
      return;
    }
    setOk(true);
    setTimeout(() => navigate('/login'), 1200);
  };

  const field = (name) => ({ name, value: form[name], error: errors[name], onChange: handleChange });

  return (
    <div className="container" style={{ maxWidth: 680 }}>
      <div className="auth-card p-4">
        <h1 className="h3 fw-bold mb-3">Crear cuenta</h1>
        <ErrorMessage error={serverError} onClose={() => setServerError('')} />
        <Alert message={ok ? 'Cuenta creada. Te llevamos al inicio de sesión…' : ''} variant="success" />
        <form noValidate onSubmit={handleSubmit} className="row g-3">
          <FormField label="RUN" required className="col-md-4" placeholder="12345678-5" {...field('run')} />
          <FormField label="Nombre" required className="col-md-4" {...field('nombre')} />
          <FormField label="Apellidos" required className="col-md-4" {...field('apellidos')} />
          <FormField label="Correo" type="email" required className="col-md-6" {...field('email')} />
          <FormField label="Dirección (opcional)" className="col-md-6" {...field('direccion')} />
          <FormField label="Región (opcional)" as="select" className="col-md-6"
            options={regionService.getAll().map((r) => r.nombre)} {...field('region')} />
          <FormField label="Comuna (opcional)" as="select" className="col-md-6"
            options={regionService.getComunas(form.region)} {...field('comuna')} />
          <FormField label="Contraseña" type="password" required className="col-md-6" {...field('password')} />
          <FormField label="Confirmar contraseña" type="password" required className="col-md-6" {...field('confirmPassword')} />
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">Registrarme</button>
          </div>
        </form>
        <p className="small mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};
