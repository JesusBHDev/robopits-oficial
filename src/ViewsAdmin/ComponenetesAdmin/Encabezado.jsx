import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export function EncabezadoAdmin() {
  const { logoutEmpleado, empleado } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false); // Estado para manejar la visibilidad del menú

  const handleLogout = () => {
    logoutEmpleado();
  };

  const toggleMenu = () => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible); // Alterna la visibilidad del menú
  };

  return (
    <>
      <div className="bg-blue-600 flex justify-between items-center py-4 px-6 shadow-md w-full fixed top-0 left-0 z-10">
        <div>
          <button
            type="button"
            onClick={toggleMenu}
            className="text-white px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800"
          >
            Menu
          </button>
        </div>
        <img
          src="images/robopits-pequeño.webp"
          className="w-10 h-10 rounded-full "
        />
        <div className="text-white text-xl font-bold">Robopits</div>
        <div className="text-white">Bienvenido {empleado.Nombre}</div>
        <div>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      {/* Mostrar el menú si menuVisible es true */}
      <div
        role="navigation" // Add this role to make selection easier in tests
        className={`bg-gray-900 text-gray-200 w-60 flex flex-col items-center pt-20 h-full fixed top-0 left-0 transform transition-transform duration-300 
          ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 flex flex-col items-center">
          <img
            src="images/robopits-pequeño.webp"
            alt="User"
            className="w-24 h-24 rounded-full mb-2"
          />
          <h2 className="text-lg font-semibold">ROBOPITS</h2>
          <p className="text-sm">Panel Administrativo</p>
        </div>
        <nav className="w-full flex flex-col items-center">
          <Link to="/PanelAdmin" className="mb-4 w-4/5 flex justify-center">
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Home
            </button>
          </Link>
          <Link to="/AdminProductos" className="mb-4 w-4/5 flex justify-center">
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Productos
            </button>
          </Link>
          <Link
            to="/AdminCategorias"
            className="mb-4 w-4/5 flex justify-center"
          >
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Categorías
            </button>
          </Link>
          <Link to="/AdminEmpleados" className="mb-4 w-4/5 flex justify-center">
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Empleados
            </button>
          </Link>
          <Link to="/AdminPedidos" className="mb-4 w-4/5 flex justify-center">
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Pedidos
            </button>
          </Link>
          <Link
            to="/HistorialPedidos"
            className="mb-4 w-4/5 flex justify-center"
          >
            <button className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
              Historial Pedidos
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
}
