// Pruebas de RENDERIZADO CONDICIONAL: el mensaje de error solo aparece si hay error
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert, ErrorMessage } from './Alert';

describe('Alert / ErrorMessage', () => {
  it('NO renderiza nada cuando no hay error', () => {
    const { container } = render(<ErrorMessage error="" />);
    expect(container.innerHTML).toBe('');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renderiza el mensaje cuando hay un error presente', () => {
    render(<ErrorMessage error="Correo inválido" />);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain('Correo inválido');
    expect(alert.className).toContain('alert-danger');
  });

  it('muestra el botón de cerrar solo si se entrega onClose y lo ejecuta', () => {
    const onClose = jasmine.createSpy('onClose');
    const { rerender } = render(<Alert message="Hola" />);
    expect(screen.queryByLabelText('Cerrar mensaje')).toBeNull();
    rerender(<Alert message="Hola" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Cerrar mensaje'));
    expect(onClose).toHaveBeenCalled();
  });
});
