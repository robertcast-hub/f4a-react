import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentMethodSelector } from './PaymentMethodSelector';

describe('PaymentMethodSelector', () => {
  it('renderiza una opción por cada medio de pago', () => {
    render(<PaymentMethodSelector value="" onChange={() => {}} />);
    expect(screen.getAllByRole('radio').length).toBe(5);
    expect(screen.getByText('Mercado Pago')).toBeTruthy();
  });

  it('al elegir una opción llama a onChange con su id', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<PaymentMethodSelector value="" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: /PayPal/ }));
    expect(onChange).toHaveBeenCalledWith('paypal');
  });

  it('marca la opción seleccionada y muestra el error solo si existe', () => {
    const { rerender } = render(<PaymentMethodSelector value="visa" onChange={() => {}} />);
    expect(screen.getByRole('radio', { name: /^Visa/ }).checked).toBeTrue();
    expect(screen.queryByRole('alert')).toBeNull();
    rerender(<PaymentMethodSelector value="" onChange={() => {}} error="Selecciona un medio de pago." />);
    expect(screen.getByRole('alert').textContent).toBe('Selecciona un medio de pago.');
  });
});
