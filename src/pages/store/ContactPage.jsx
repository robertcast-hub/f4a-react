// src/pages/store/ContactPage.jsx
import { useState } from 'react';
import { isRequired, isValidEmail, hasErrors } from '../../utils/validators';
import { FormField } from '../../components/common/FormField';
import { Alert } from '../../components/common/Alert';
import { PageTitle } from '../../components/common/PageTitle';

const initial = { nombre: '', email: '', mensaje: '' };

export const ContactPage = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!isRequired(form.nombre)) found.nombre = 'Ingresa tu nombre.';
    if (!isValidEmail(form.email)) found.email = 'Ingresa un correo válido.';
    if (String(form.mensaje).trim().length < 10) found.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    setErrors(found);
    if (hasErrors(found)) return;
    setEnviado(true);
    setForm(initial);
  };

  return (
    <div className="container">
      <PageTitle title="Contacto" subtitle="Respondemos en menos de 24 horas" />
      <div className="row g-4">
        <div className="col-md-5">
          <p><strong>Correo:</strong> soporte@f4a.cl</p>
          <p><strong>WhatsApp:</strong> +56 9 1234 5678</p>
          <p><strong>Horario:</strong> lunes a domingo, todo el día</p>
        </div>
        <div className="col-md-7">
          <Alert message={enviado ? 'Mensaje enviado. Te responderemos pronto.' : ''} variant="success" onClose={() => setEnviado(false)} />
          <form noValidate onSubmit={handleSubmit} className="row g-3">
            <FormField label="Nombre" name="nombre" value={form.nombre} error={errors.nombre} onChange={handleChange} required />
            <FormField label="Correo" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} required />
            <FormField label="Mensaje" name="mensaje" as="textarea" value={form.mensaje} error={errors.mensaje} onChange={handleChange} required />
            <div className="col-12"><button type="submit" className="btn btn-success">Enviar mensaje</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};
