import React, { useState, useEffect } from 'react'
import '../css/componentes-inicio.css'
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

import MigasPan from '../views/MigasPan.jsx';
import { IconoUsuarioG, IconoUsuarioC } from './IconoUsuario.jsx';

/* Este es el header o encabezado del inicio */
export const HeaderInicio = () => {
    /* El código const [isSidebarOpen, setIsSidebarOpen] = useState(false); crea un estado llamado isSidebarOpen con el valor inicial de false. 
        Esto significa que el sidebar estará cerrado de forma predeterminada. */
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user } = useAuth();


    // Función para manejar el cambio de tamaño de la ventana
    const handleResize = () => {
        if (window.innerWidth > 1292) {
            // Si la ventana es más grande que 768px, cierra la barra lateral
            setIsSidebarOpen(false);
        }
    };

    // Agregar evento de cambio de tamaño cuando se monta el componente
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Limpia el evento cuando se desmonta el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='container-header'>
            <header className="header">
                <div className="logo-y-nombre">
                    <img src="/images/robopits-pequeño.webp" alt="RoboPits" className="Logo" />
                    <NavLink to="/Inicio">
                        <h1 className="RoboPits">RoboPits</h1>
                    </NavLink>
                </div>
                <div className='container w-8/12 w-full'>
                    <Secciones />
                </div>
                <div className='w-full flex justify-end mr-3 md:mr-14 h-auto'>
                    <div className='md:flex block'>
                        {user ? (
                            <div className='flex md:text-xl text-sm font-bold text-blue-500 items-center'>
                                <Icon icon="mdi:circle" className='bg-green-500 rounded-full text-green-500 md:size-3 mr-1.5 size-2' /> Bienvenido, {user.Nombre}!
                            </div>
                        ) : (
                            <div className='flex mr-3'>
                                <BotonPersonalizable estilos={"w-auto h-auto pr-2"} url={"/login"} titulo={"Iniciar sesión"} estiloTexto={"text-white Login w-28 h-9 grid place-items-center"} />
                                <BotonPersonalizable estilos={"w-auto h-auto pl-2"} url={"/registro"} titulo={"Registro"} estiloTexto={"text-white Registro w-28 h-9 grid place-items-center"} />
                            </div>
                        )}
                    </div>
                    <div className='flex items-center'>

                        {user ? (
                            <div className='md:flex block items-center'>
                                <IconoUsuarioG />
                            </div>
                        ) : (
                            <div className='flex mr-3 items-center'>
                                <IconoUsuarioC />
                            </div>
                        )}

                        <NavLink to="/carrito">
                            <Icon icon="mdi:cart-outline" className='text-black size-8' />
                        </NavLink>
                    </div>
                </div>
            </header>
            <div className="boton-categorias">
                {/* Este boton es el boton de categorías que cambia si esta abierto o cerrado */}
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ "backgroundColor": "transparent", "borderColor": "transparent", marginTop: "5px" }}>
                    {isSidebarOpen ? <Icon icon="ic:baseline-menu-open" style={{ fontSize: "32px" }} /> : <Icon icon="ic:baseline-menu" style={{ fontSize: "31px" }} />}
                </button>
            </div>
            {/* Aquí se recorre el contenido de la funcion links que se muestran con el botón en el navbar cuando se hace usa en celular, table o laptop pequeña */}
            {links.map((link, index) => (
                <div className="lista-categorias animate__animated animate__backInDown" style={{ display: isSidebarOpen ? "grid" : "none" }} key={index}>
                    <div key={index}>
                        <div className="cat-bar">
                            <NavLink to={link.href}>{link.name}</NavLink>
                        </div>
                    </div>
                </div>
            ))}
            <div className='w-auto h-auto'>
                <MigasPan />
            </div>
        </div>


    );
};

/* Este es el Navbar donde estan los enlaces de algunas categorías */
export const Secciones = () => {
    return (
        <div className='container-navbar'>
            <nav className="Navbar">
                {links.map(x => (
                    <div className="categorias">
                        <NavLink to={x.href}>
                            <p className="cat-nav">{x.name}</p>
                        </NavLink>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export const FooterInicio = () => {
    return (
        <div className='bg-emerald-950 w-auto h-auto lg:flex justify-between grid place-items-center md:justify-center'>
            <div className='w-auto h-auto grid text-center '>
                <NavLink to="https://maps.app.goo.gl/y7FaWg3pNfXmeA298">
                    <div className='flex p-5 h-auto items-center'>
                        <Icon icon="mdi:map-marker" style={{ width: "35px", height: "35px", color: "#4db4b2" }} />
                        <p className='text-white font-bold ml-2.5'>C. Morelos 442, Centro, 43000 Huejutla, Hgo</p>
                    </div>
                </NavLink>
                <NavLink to="mailto:Robopits@gmail.com">
                    <div className='flex p-5 h-auto items-center'>
                        <Icon icon="mdi:gmail" style={{ width: "35px", height: "35px", color: "#4db4b2" }} />
                        <p className='text-white font-bold ml-2.5 w-64 md:w-auto'>Robopits@gmail.com</p>
                    </div>
                </NavLink>

                <NavLink to="https://api.whatsapp.com/send/?phone=7713926338">
                    <div className='flex p-5 h-auto items-center'>
                        <Icon icon="mdi:whatsapp" style={{ width: "35px", height: "35px", color: "#4db4b2" }} />
                        <p className='text-white font-bold ml-2.5 w-64 md:w-auto'>7713926338</p>
                    </div>
                </NavLink>

                <NavLink to="https://www.facebook.com/RoboPitS">
                    <div className='flex p-5 h-auto items-center'>
                        <Icon icon="mdi:facebook" style={{ width: "35px", height: "35px", color: "#4db4b2" }} />
                        <p className='text-white font-bold ml-2.5 w-64 md:w-auto'>RoboPits</p>
                    </div>
                </NavLink>
            </div>

            <div className='w-auto h-auto grid text-center lg:pr-10 lg:pl-6'>
                <div className='flex p-5'>
                    <p className='text-white font-bold md:w-96 w-60'>© 2023 Componentes electrónicos RoboPits</p>
                </div>
                <div className='flex p-5'>
                    <NavLink to="/avisos-de-privacidad">
                        <p className='text-white font-bold md:w-96 w-60'>Avisos de privacidad</p>
                    </NavLink>
                </div>
                <div className='flex p-5'>
                    <NavLink to="/terminos-y-condiciones">
                        <p className='text-white font-bold md:w-96 w-60'>Términos y condiciones</p>
                    </NavLink>
                </div>
                <div className='flex p-5'>
                    <NavLink to="/quienes-somos">
                        <p className='text-white font-bold md:w-96 w-60'>¿Quiénes somos?</p>
                    </NavLink>
                </div>
                <div className='flex p-5'>
                    <NavLink to="/preguntas-frecuentes">
                        <p className='text-white font-bold md:w-96 w-60'>Preguntas Frecuentes</p>
                    </NavLink>
                </div>
            </div>

            <div className='w-auto h-auto grid text-center items-center lg:pr-16 lg:pl-32 place-items-center'>
                <img src="/images/robopits-transparente2.webp" alt="RoboPits" className='h-auto w-auto mt-10 md:mt-0' />
                <h1 className='text-white font-extrabold text-3xl'>RoboPits</h1>
            </div>
        </div>
    )
}

export const BotonPersonalizable = ({ estilos, titulo, url, estiloTexto }) => {
    return (
        <div className={estilos}>
            <NavLink to={url}>
                <div className={estiloTexto}>
                    {titulo}
                </div>
            </NavLink>
        </div>
    );
};



const links = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Productos",
        href: "/todos-los-productos"
    },
    {
        name: "Categorías",
        href: "/categorias"
    },
    {
        name: "¿Quiénes somos?",
        href: "/quienes-somos"
    },
]; 