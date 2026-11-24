import { screen, fireEvent } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
import { authService } from '../../data/dataService';
import { renderWithProviders } from '../../test/renderWithProviders';

const set = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('RegisterPage', () => {
  beforeEach(() => renderWithProviders(<RegisterPage />, { route: '/registro', path: '/registro' }));

  it('muestra los errores de validación de RUN y contraseñas', () => {
    set(/^RUN/, '12345678-K');
    set(/^Contraseña/, '123456');
    set(/^Confirmar contraseña/, '000000');
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
    expect(screen.getByText(/RUN inválido/)).toBeTruthy();
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeTruthy();
  });

  it('con datos válidos llama a authService.register y muestra confirmación', () => {
    spyOn(authService, 'register').and.returnValue({ ok: true, user: {} });
    set(/^RUN/, '12345678-5');
    set(/^Nombre/, 'Ana');
    set(/^Apellidos/, 'Díaz');
    set(/^Correo/, 'ana@x.cl');
    set(/^Contraseña/, '123456');
    set(/^Confirmar contraseña/, '123456');
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
    expect(authService.register).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'ana@x.cl', run: '12345678-5' }));
    expect(authService.register.calls.mostRecent().args[0].confirmPassword).toBeUndefined();
    expect(screen.getByText(/Cuenta creada/)).toBeTruthy();
  });

  it('al cambiar la región se reinicia la comuna', () => {
    set(/^Región/, 'Región Metropolitana de Santiago');
    set(/^Comuna/, 'Maipú');
    set(/^Región/, 'Región de Valparaíso');
    expect(screen.getByLabelText(/^Comuna/).value).toBe('');
  });
});
