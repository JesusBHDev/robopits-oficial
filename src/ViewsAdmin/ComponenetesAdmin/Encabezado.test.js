import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EncabezadoAdmin } from './Encabezado';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));
describe('EncabezadoAdmin Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      logoutEmpleado: jest.fn(),
      empleado: { Nombre: 'Empleado Test' },
    });
  });
  it('debería mostrar el nombre del empleado', () => {
    render(
      <BrowserRouter>
        <EncabezadoAdmin />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Bienvenido\s*Empleado\s*Test/i)
    ).toBeInTheDocument();
  });

  it('debería llamar a `logoutEmpleado` al hacer clic en "Cerrar sesión"', () => {
    const { logoutEmpleado } = useAuth();
    render(
      <BrowserRouter>
        <EncabezadoAdmin />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Cerrar sesión/i));
    expect(logoutEmpleado).toHaveBeenCalled();
  });

  it('debería alternar el menú al hacer clic en "Menu"', async () => {
    render(
      <BrowserRouter>
        <EncabezadoAdmin />
      </BrowserRouter>
    );

    // Retrieve all elements with the role "navigation"
    const menus = screen.getAllByRole('navigation', { hidden: true });
    const menu = menus[0]; // Assuming the first navigation element is the menu you want

    // Check that the menu has the class `-translate-x-full` initially
    expect(menu).toHaveClass('-translate-x-full');

    // Simulate a click on the "Menu" button to toggle the menu visibility
    fireEvent.click(screen.getByText(/Menu/i));

    // Verify that the menu is now visible (class `-translate-x-full` removed)
    await waitFor(() => {
      expect(menu).toHaveClass('translate-x-0');
    });
  });
});
