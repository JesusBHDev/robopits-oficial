import { render, screen } from '@testing-library/react';
import Componente1 from './components/componente1';

test("verifica que el botón con el texto 'Agregar al carrito' esté presente", () => {
  render(<Componente1 />);
  const buttonElement = screen.getByRole('button', {
    name: /Agregar al carrito/i,
  });
  
  expect(buttonElement).toBeInTheDocument();
});
