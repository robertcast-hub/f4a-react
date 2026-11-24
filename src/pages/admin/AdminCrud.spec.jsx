// Flujos CRUD del panel: crear/editar producto, categorías, usuarios y perfil
import { screen, fireEvent, within } from '@testing-library/react';
import { ProductFormPage } from './ProductFormPage';
import { CategoriesAdminPage } from './CategoriesAdminPage';
import { CategoryFormPage } from './CategoryFormPage';
import { UsersAdminPage } from './UsersAdminPage';
import { UserFormPage } from './UserFormPage';
import { ProfilePage } from './ProfilePage';
import { productService, categoryService, userService, authService } from '../../data/dataService';
import { renderWithProviders, mockAdmin } from '../../test/renderWithProviders';

const set = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('Panel admin: CRUD', () => {
  it('editar producto guarda los cambios y navega a su ficha', () => {
    renderWithProviders(<ProductFormPage />, { route: '/admin/productos/P002/editar', path: '/admin/productos/:id/editar' });
    expect(screen.getByLabelText(/^Nombre/).value).toContain('Grand Theft Auto V');
    set(/^Stock\W*$/, '99');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    expect(productService.getById('P002').stock).toBe(99);
    expect(screen.getByTestId('location').textContent).toBe('/admin/productos/P002');
  });

  it('crear producto llama a productService.create (spy que delega al original)', () => {
    spyOn(productService, 'create').and.callThrough();
    renderWithProviders(<ProductFormPage />, { route: '/admin/productos/nuevo', path: '/admin/productos/nuevo' });
    set(/^Nombre/, 'Hades II');
    set(/^Categoría/, 'gaming');
    set(/^Precio \(CLP\)/, '24990');
    set(/^Stock\W*$/, '20');
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
    expect(productService.create).toHaveBeenCalledTimes(1);
    expect(productService.search({ query: 'hades' }).length).toBe(1);
  });

  it('no permite eliminar una categoría con productos asociados', () => {
    const removeSpy = spyOn(categoryService, 'remove');
    renderWithProviders(<CategoriesAdminPage />);
    const row = screen.getByText('Software').closest('tr');
    fireEvent.click(within(row).getByRole('button', { name: 'Eliminar' }));
    expect(screen.getByRole('alert').textContent).toContain('tiene productos asociados');
    expect(removeSpy).not.toHaveBeenCalled();
  });

  it('crea una categoría nueva y rechaza códigos duplicados', () => {
    renderWithProviders(<CategoryFormPage />, { route: '/admin/categorias/nueva', path: '/admin/categorias/nueva' });
    set(/^Código/, 'gaming');
    set(/^Nombre/, 'Duplicada');
    fireEvent.click(screen.getByRole('button', { name: 'Crear categoría' }));
    expect(screen.getByText('Ya existe una categoría con ese código.')).toBeTruthy();
    set(/^Código/, 'retro');
    fireEvent.click(screen.getByRole('button', { name: 'Crear categoría' }));
    expect(categoryService.getById('retro').nombre).toBe('Duplicada');
    expect(screen.getByTestId('location').textContent).toBe('/admin/categorias');
  });

  it('el administrador no puede eliminar su propia cuenta', () => {
    spyOn(authService, 'getSession').and.returnValue(mockAdmin);
    renderWithProviders(<UsersAdminPage />);
    const own = screen.getByText('admin@f4a.cl').closest('tr');
    expect(within(own).getByRole('button', { name: 'Eliminar' }).disabled).toBeTrue();
  });

  it('eliminar un usuario confirmado lo quita de la tabla', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    renderWithProviders(<UsersAdminPage />);
    const row = screen.getByText('camila@correo.cl').closest('tr');
    fireEvent.click(within(row).getByRole('button', { name: 'Eliminar' }));
    expect(screen.queryByText('camila@correo.cl')).toBeNull();
    expect(userService.getById('U003')).toBeNull();
  });

  it('crear usuario con correo existente muestra error en el campo', () => {
    renderWithProviders(<UserFormPage />, { route: '/admin/usuarios/nuevo', path: '/admin/usuarios/nuevo' });
    set(/^RUN/, '12345678-5');
    set(/^Nombre/, 'Otro');
    set(/^Apellidos/, 'Admin');
    set(/^Correo/, 'admin@f4a.cl');
    set(/^Contraseña/, '123456');
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));
    expect(screen.getByText('Ya existe otro usuario con ese correo.')).toBeTruthy();
  });

  it('editar usuario sin escribir contraseña conserva la contraseña actual', () => {
    renderWithProviders(<UserFormPage />, { route: '/admin/usuarios/U003/editar', path: '/admin/usuarios/:id/editar' });
    set(/^Nombre/, 'Camila Andrea');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    const saved = userService.getById('U003');
    expect(saved.nombre).toBe('Camila Andrea');
    expect(saved.password).toBe('camila123');
    expect(screen.getByTestId('location').textContent).toBe('/admin/usuarios/U003');
  });

  it('el perfil actualiza los datos y la sesión, sin permitir cambiar el rol', () => {
    authService.login('admin@f4a.cl', 'admin123');
    renderWithProviders(<ProfilePage />);
    expect(screen.getByLabelText(/^Rol/).disabled).toBeTrue();
    set(/^Nombre/, 'Administradora');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    expect(screen.getByRole('alert').textContent).toContain('Perfil actualizado');
    expect(authService.getSession().nombre).toBe('Administradora');
    expect(authService.getSession().rol).toBe('admin');
  });
});
