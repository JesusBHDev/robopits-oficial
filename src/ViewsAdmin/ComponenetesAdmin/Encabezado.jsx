import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate, NavLink } from "react-router-dom";
export function EncabezadoAdmin() {
  const { logoutEmpleado, empleado } = useAuth();

  const handleLogout = () => {
    logoutEmpleado();
  };

  return (
    <div className="bg-blue-600 flex justify-between items-center py-4 px-6 shadow-md w-full fixed top-0 left-0 z-10">
      <div>
        <img src="images/robopits-pequeño.webp" alt="RoboPits" className="h-10" />
      </div>
      <div className="text-white text-xl font-bold">Robopits</div>
      <div className="text-white">
        Bienvenido {empleado.Nombre}
      </div>
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
  );
}

export function BotonMenu() {
  return (
    <div className="bg-gray-900 md:bg-red-800 w-40 flex flex-col items-center pt-20 h-full fixed top-16 left-0">
      <NavLink to="/AdminProductos" className="mb-2 w-4/5">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Productos
        </button>
      </NavLink>
      <NavLink to="/AdminCategorias" className="mb-2 w-4/5">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Categorias
        </button>
      </NavLink>
      <NavLink to="/AdminEmpleados" className="mb-2 w-4/5">
        <button className=" px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Empleados
        </button>
      </NavLink>
      <NavLink to="/AdminVentas" className="mb-2 w-4/5">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Ventas
        </button>
      </NavLink>
      <NavLink to="/AdminPedidos" className="mb-2 w-4/5">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Pedidos
        </button>
      </NavLink>
      <NavLink to="/AdminPagina" className="mb-2 w-4/5">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Pagina web
        </button>
      </NavLink>
    </div>
  );
}

