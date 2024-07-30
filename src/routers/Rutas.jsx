import { createBrowserRouter } from "react-router-dom";
/*CLIENTE*/
import ProtectedRoutes from "../ProtectedRoutes.jsx";
import ProtectorRutasPrivadas from "../ViewsAdmin/ProtectorRutasPrivadas.jsx";
import ArduinoMCU from '../views/ArduinoMCU';
import Bienvenida from '../views/Bienvenida';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import Microcontroladores from '../views/Microcontroladores';
import Modulos from '../views/Modulos';
import Motores from '../views/Motores';
import Botones from '../views/Botones';
import Potenciometros from '../views/Potenciometros';
import Protoboard from '../views/Protoboard';
import Registro from '../views/Registro';
import RestablecerContrasena from '../views/RestablecerContrasena';
import Sensores from '../views/Sensores';
import Soldadura from '../views/Soldadura';
import Error404 from '../views/Error404';
import PreguntasFrecuentes from "../views/PreguntasFrecuentes";
import QuienesSomos from "../views/QuienesSomos";
import TerminosCondiciones from "../views/TerminosCondiciones";
import AvisosPrivacidad from "../views/AvisosPrivacidad";
import PasswordReset from "../views/PasswordReset";
import Perfil from "../views/Perfil.jsx";
/*PRODUCTOS CLIENTE*/
import Productos from '../views/Productos';
import Categorias from "../views/Categorias.jsx";
import ResenaProducto from "../views/ResenaProducto.jsx";

/*ADMINISTRADOR*/

import IniciarSesion from "../ViewsAdmin/IniciarSesion";
import AdminProductos from "../ViewsAdmin/AdminProductos";
import AdminCategorias from "../ViewsAdmin/AdminCategorias";
import RevenuePrediction from "../ViewsAdmin/problema.jsx";
import PanelAdmin from "../ViewsAdmin/PanelAdmin.jsx";
import AdminEmpleado from "../ViewsAdmin/AdminEmpleado.jsx";
import AdminVentas from "../ViewsAdmin/AdminVentas.jsx";
import AdminPedidos from "../ViewsAdmin/AdminPedidos.jsx";
import AdminPagina from "../ViewsAdmin/AdminPagina.jsx";
import ProductosPorCategoria from "../views/ProductosPorCategoria.jsx";
import Carrito from "../views/Carrito.jsx";
import Pedido from "../views/Pedido.jsx";
export const Rutas = createBrowserRouter([
    {
        path: "/Inicio",
        element: <Inicio/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registro",
        element: <Registro/>
    },
    {
        path: "/restablecerContrasena",
        element: <RestablecerContrasena/>
    },
    {
        path:"/PasswordReset",
        element: <PasswordReset/>
    },

    /* Rutas del Nav */
    {
        path: "/sensores",
        element: <Sensores/>
    },
    {
        path: "/modulos",
        element: <Modulos/>
    },
    {
        path: "/arduino",
        element: <ArduinoMCU/>
    },
    {
        path: "/soldadura",
        element: <Soldadura/>
    },
    {
        path: "/protoboard",
        element: <Protoboard/>
    },
    {
        path: "/microcontroladores",
        element: <Microcontroladores/>
    },
    { 
        path: "/motores",
        element: <Motores/>
    },
    {
        path: "/botones",
        element: <Botones/>
    },
    {
        path: "/potenciometros",
        element: <Potenciometros/>
    },
    {
        path: "/categorias",
        element: <Categorias/>
    },
    {
        path: "/todos-los-productos",
        element:  <ProtectedRoutes Page={Productos}/>
                        
    },
    {
        path: "/resena-producto/:id",
        element:  <ProtectedRoutes Page={ResenaProducto}/>
                        
    },

    {
        path: "/preguntas-frecuentes",
        element: <PreguntasFrecuentes/>
    },
    {
        path: "/quienes-somos",
        element: <QuienesSomos/>
    },
    {
        path: "/terminos-y-condiciones",
        element: <TerminosCondiciones/>
    },
    {
        path: "/avisos-de-privacidad",
        element: <AvisosPrivacidad/>
    },
    {
        path: "/",
        element: <Bienvenida/>,
        errorElement: <Error404/>,
    },
    {
        path: "/Carrito",
        element: <Carrito/>,
        errorElement: <Error404/>,
    },
    {
        path: "/Pedidos",
        element: <Pedido/>,
        errorElement: <Error404/>,
    },
    {
        path: "/categoria/:id",
        element: <ProductosPorCategoria/>
    },
    {
        path:"/perfil",
        element:  <ProtectedRoutes Page={Perfil}/>
    },
    ///////////////Rutas del Admin//////////////////////
    {
        path: "/login-admin",
        element: <IniciarSesion/>,
        errorElement: <Error404/>
    },
    {
        path:"/PanelAdmin",
        element:<ProtectorRutasPrivadas Page={PanelAdmin}/>
    },
    {
        path:"/AdminProductos",
        element: <ProtectorRutasPrivadas Page={AdminProductos}/>,
        errorElement: <Error404/>,
    },
    {
        path:"/AdminCategorias",
        element: <ProtectorRutasPrivadas Page={AdminCategorias}/>
                        
    },
    {
        path:"/AdminEmpleados",
        element: <ProtectorRutasPrivadas Page={AdminEmpleado}/>
                        
    },
    {
        path:"/AdminVentas",
        element: <ProtectorRutasPrivadas Page={AdminVentas}/>
                        
    },
    {
        path:"/AdminPedidos",
        element: <ProtectorRutasPrivadas Page={AdminPedidos}/>
                        
    },
    {
        path:"/AdminPagina",
        element: <ProtectorRutasPrivadas Page={AdminPagina}/>
                        
    },
    {
        path:"/problema",
        element: <RevenuePrediction/>
    }
]);


export default Rutas

