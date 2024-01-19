import { createBrowserRouter } from "react-router-dom";
import ArduinoMCU from '../views/ArduinoMCU';
import Bienvenida from '../views/Bienvenida';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import Microcontroladores from '../views/Microcontroladores';
import Modulos from '../views/Modulos';
import Motores from '../views/Motores';
import Botones from '../views/Botones';
import Potenciometros from '../views/Potenciometros';
import Productos from '../views/Productos';
import Protoboard from '../views/Protoboard';
import Registro from '../views/Registro';
import RestablecerContrasena from '../views/RestablecerContrasena';
import Sensores from '../views/Sensores';
import Soldadura from '../views/Soldadura';
import Error404 from '../views/Error404';

export const Rutas = createBrowserRouter([
    {
        path: "/",
        element: <Bienvenida/>,
        errorElement: <Error404/>,
    },
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
        path: "/todos-los-productos",
        element: <Productos/>
    },
    
]);

export default Rutas
