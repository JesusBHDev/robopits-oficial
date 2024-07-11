import { useAuth } from "../../context/AuthContext.jsx"
import { Navigate, NavLink } from "react-router-dom"
export function EncabezadoAdmin() {

    const { logoutEmpleado, empleado } = useAuth()

    const handleLogout = () => {
        logoutEmpleado();
    };

    return (
        <div className="bg-blue-500 flex justify-between py-5 px-4 h-auto">
            <div>
                <img src="images/robopits-pequeño.png" alt="RoboPits" className="Logo" />
            </div>
            <div>Robopits</div>
            <div>
                <li> Bienvenido {empleado.Nombre}</li>
            </div>
            <div>
                <button type="button" onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>

    )
}

export function BotonMenu() {
    return (
        <div className="fixed h-auto left-0 top-24 bg-black w-32 flex flex-col items-center justify-start py-4 ">
            <NavLink to="/AdminProductos">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Productos
                </button>
            </NavLink>
            <NavLink to="/AdminCategorias">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Categorias
                </button>
            </NavLink>
            <NavLink to="/AdminEmpleados">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Empleados
                </button>
            </NavLink>
            <NavLink to="/AdminVentas">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Ventas
                </button>
            </NavLink>
            <NavLink to="/AdminPedidos">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Pedidos
                </button>
            </NavLink>
            <NavLink to="/AdminPagina">
                <button className="mb-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100">
                    Pagina web
                </button>
            </NavLink>
        </div>
    );
}