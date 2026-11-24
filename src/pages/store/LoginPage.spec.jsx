// Formulario de inicio de sesión: estado, errores condicionales y uso de mocks del servicio
import { screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { authService } from '../../data/dataService';
import { renderWithProviders, mockAdmin, mockClient } from '../../test/renderWithProviders';

const renderLogin = () => renderWithProviders(<LoginPage />, { route: '/login', path: '/login' });
const fill = (email, password) => {
  fireEvent.change(screen.getByLabelText('Correo'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } });
};
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

describe('LoginPage', () => {
  it('actualiza el estado del formulario mientras el usuario escribe', () => {
    renderLogin();
    fill('admin@f4a.cl', 'secreto');
    expect(screen.getByLabelText('Correo').value).toBe('admin@f4a.cl');
    expect(screen.getByLabelText('Contraseña').value).toBe('secreto');
  });

  it('no muestra error al cargar, pero sí al enviar un correo inválido (sin llamar al servicio)', () => {
    const loginSpy = spyOn(authService, 'login');
    renderLogin();
    expect(screen.queryByRole('alert')).toBeNull();
    fill('no-es-correo', '123');
    submit();
    expect(screen.getByRole('alert').textContent).toContain('correo válido');
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('muestra el error que devuelve el servicio cuando las credenciales fallan (mock)', () => {
    spyOn(authService, 'login').and.returnValue({ ok: false, error: 'Correo o contraseña incorrectos.' });
    renderLogin();
    fill('admin@f4a.cl', 'mala');
    submit();
    expect(screen.getByRole('alert').textContent).toContain('incorrectos');
  });

  it('un administrador es redirigido al panel', () => {
    spyOn(authService, 'login').and.returnValue({ ok: true, user: mockAdmin });
    renderLogin();
    fill('admin@f4a.cl', 'admin123');
    submit();
    expect(authService.login).toHaveBeenCalledWith('admin@f4a.cl', 'admin123');
    expect(screen.getByTestId('location').textContent).toBe('/admin');
  });

  it('un cliente es redirigido a la tienda', () => {
    spyOn(authService, 'login').and.returnValue({ ok: true, user: mockClient });
    renderLogin();
    fill('cliente@f4a.cl', 'cliente123');
    submit();
    expect(screen.getByTestId('location').textContent).toBe('/');
  });
});
