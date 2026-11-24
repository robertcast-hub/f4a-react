import { render, screen, fireEvent } from '@testing-library/react';
import { QuantitySelector } from './QuantitySelector';

describe('QuantitySelector', () => {
  it('muestra el valor recibido', () => {
    render(<QuantitySelector value={3} onChange={() => {}} />);
    expect(screen.getByTestId('quantity-value').textContent).toBe('3');
  });

  it('el botón + llama a onChange con valor + 1', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<QuantitySelector value={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Aumentar cantidad'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('el botón − llama a onChange con valor − 1', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<QuantitySelector value={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Disminuir cantidad'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('deshabilita los botones en los límites mínimo y máximo', () => {
    const { rerender } = render(<QuantitySelector value={1} min={1} max={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Disminuir cantidad').disabled).toBeTrue();
    rerender(<QuantitySelector value={5} min={1} max={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Aumentar cantidad').disabled).toBeTrue();
  });
});
