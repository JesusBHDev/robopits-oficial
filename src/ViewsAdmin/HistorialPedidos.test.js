// HistorialPedidos.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import HistorialPedidos from './HistorialPedidos';
import '@testing-library/jest-dom';
import { obtenerHistorialDePedidos } from '../api/auth';
import * as AuthContext from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment'; // Importa moment

// Mock de la función `obtenerHistorialDePedidos`
jest.mock('../api/auth', () => ({
  obtenerHistorialDePedidos: jest.fn(),
}));

// Mock de `useAuth` desde `AuthContext`
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: jest.fn(),
}));

describe('HistorialPedidos Component', () => {
  beforeEach(() => {
    // Configuración del mock para `useAuth`
    AuthContext.useAuth.mockReturnValue({
      logoutEmpleado: jest.fn(),
      empleado: { Nombre: 'Empleado Test' },
    });
    // Datos simulados para `obtenerHistorialDePedidos`
    obtenerHistorialDePedidos.mockResolvedValue({
      data: [
        {
          _id: '1',
          informacion: {
            cliente: { nombre: 'Javier' },
            estado: 'Listo',
            puntoDeRetiro: 'Pendiente',
            createdAt: '2024-07-25T16:34:00Z',
          },
        },
        {
          _id: '2',
          informacion: {
            cliente: { nombre: 'Bernardo' },
            estado: 'Listo',
            puntoDeRetiro: 'Pendiente',
            createdAt: '2024-07-25T16:42:00Z',
          },
        },
      ],
    });
  });

  test('debería mostrar la lista de pedidos después de cargar los datos', async () => {
    render(
      <MemoryRouter>
        <HistorialPedidos />
      </MemoryRouter>
    );

    // Verifica que el título "Historial de Pedidos" esté en el documento
    expect(screen.getByText(/Historial de Pedidos/i)).toBeInTheDocument();

    // Verificar que el nombre "Javier" esté en el documento
    expect(await screen.findByText('Javier')).toBeInTheDocument();

    // Obtener todas las coincidencias de "Estado:" y verificar su contenido
    const estados = screen.getAllByText(/Estado:/i);
    expect(estados[0]).toBeInTheDocument();
    expect(estados[1]).toBeInTheDocument();

    // Verificar que cada estado tenga el texto "Listo"
    expect(screen.getAllByText(/Listo/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Listo/i)[1]).toBeInTheDocument();

    // Verificar el texto "Punto de Retiro:" y "Pendiente"
    expect(screen.getAllByText(/Punto de Retiro:/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Pendiente/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Punto de Retiro:/i)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/Pendiente/i)[1]).toBeInTheDocument();

    // Verificar la fecha del primer pedido usando moment para generar la fecha esperada
    const fechaEsperada1 = moment('2024-07-25T16:34:00Z').format(
      'DD/MM/YYYY HH:mm'
    );
    expect(
      screen.getByText(new RegExp(fechaEsperada1, 'i'))
    ).toBeInTheDocument();

    // Verificar el nombre "Bernardo"
    expect(await screen.findByText('Bernardo')).toBeInTheDocument();

    // Verificar la fecha del segundo pedido usando moment para generar la fecha esperada
    const fechaEsperada2 = moment('2024-07-25T16:42:00Z').format(
      'DD/MM/YYYY HH:mm'
    );
    expect(
      screen.getByText(new RegExp(fechaEsperada2, 'i'))
    ).toBeInTheDocument();
  });
});
