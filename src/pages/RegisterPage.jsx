// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-75">
      <div className="card bg-dark text-white border-secondary p-4 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="text-success fw-bold">Crear Cuenta F4A</h2>
          <p className="text-muted small">Únete para comprar licencias y videojuegos al mejor precio</p>
        </div>

        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}
        {success && <div className="alert alert-success py-2 small text-center">¡Registro exitoso! Redirigiendo al login...</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              className="form-control bg-black text-white border-secondary"
              placeholder="Ej: Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control bg-black text-white border-secondary"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control bg-black text-white border-secondary"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-semibold">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control bg-black text-white border-secondary"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold py-2 mb-3">
            Registrarme
          </button>
        </form>

        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <p className="small text-muted mb-0">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-success text-decoration-none fw-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};