// src/pages/store/LoginPage.jsx
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validators';
import { ErrorMessage } from '../../components/common/Alert';
import { FormField } from '../../components/common/FormField';

export const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (user) return <Navigate to={user.rol === 'admin' ? '/admin' : '/'} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email) || !form.password) {
      setError('Ingresa un correo válido y tu contraseña.');
      return;
    }
    const result = login(form.email, form.password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const destino = location.state?.from ?? (result.user.rol === 'admin' ? '/admin' : '/');
    navigate(destino, { replace: true });
  };

  return (
    <div className="container" style={{ maxWidth: 460 }}>
      <div className="auth-card p-4">
        <h1 className="h3 fw-bold mb-3">Iniciar sesión</h1>
        <ErrorMessage error={error} onClose={() => setError('')} />
        <form noValidate onSubmit={handleSubmit} className="row g-3">
          <FormField label="Correo" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
          <FormField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">Ingresar</button>
          </div>
        </form>
        <p className="small mt-3 mb-1">¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link></p>
        <p className="small text-secondary-emphasis mb-0">Demo: admin@f4a.cl / admin123 · cliente@f4a.cl / cliente123</p>
      </div>
    </div>
  );
};
