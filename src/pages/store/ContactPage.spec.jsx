import { screen, fireEvent } from '@testing-library/react';
import { ContactPage } from './ContactPage';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('ContactPage', () => {
  beforeEach(() => renderWithProviders(<ContactPage />));

  it('valida el mensaje mínimo y el correo', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText('Ingresa un correo válido.')).toBeTruthy();
    expect(screen.getByText(/al menos 10 caracteres/)).toBeTruthy();
  });

  it('con datos válidos confirma el envío y limpia el formulario', () => {
    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: 'ana@x.cl' } });
    fireEvent.change(screen.getByLabelText(/^Mensaje/), { target: { value: 'Necesito ayuda con mi clave' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByRole('alert').textContent).toContain('Mensaje enviado');
    expect(screen.getByLabelText(/^Nombre/).value).toBe('');
  });
});
