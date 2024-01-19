import React, { useState } from 'react'
import '../css/componentes-inicio.css';
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

/* Componentes para el carrusel de imagenes */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
/* Este es el header o encabezado del inicio */
export const HeaderInicio = () => {

    return (
        <div>
            <header class="header">
                <div class="logo-y-nombre">
                    <img src="images/robopits-pequeño.png" alt="RoboPits" class="Logo" />
                    <NavLink to="/Inicio">
                        <h1 class="RoboPits">RoboPits</h1>
                    </NavLink>
                </div>

                <div class="search-container">
                    <input type="search" autocomplete="off" placeholder="Busca componentes electrónicos, herramientas y más..." class="search-input" />
                    <button class="search-button">
                        <div class="search-icon">
                            <Icon icon="ic:baseline-search" style={{ fontSize: "32px" }} />
                        </div>
                    </button>
                </div>
                <div class="login-registro">
                    <BotonLogin />
                    <BotonRegistro />
                </div>
                <div class="contenedor-carrito-log-reg">
                    <div class="ic-login-registro">
                        <Icon icon="ic:baseline-account-circle" style={{ fontSize: "32px" }} />
                        <Icon icon="ic:baseline-shopping-cart" style={{ fontSize: "32px" }} />
                    </div>
                    <div class="ic-carrito">
                        <Icon icon="ic:baseline-shopping-cart" style={{ fontSize: "32px" }} />
                    </div>
                </div>
            </header>

        </div>

    );
};

/* Este es el Navbar donde estan los enlaces de algunas categorías */
export const NavbarInicio = () => {
    /* El código const [isSidebarOpen, setIsSidebarOpen] = useState(false); crea un estado llamado isSidebarOpen con el valor inicial de false. 
    Esto significa que el sidebar estará cerrado de forma predeterminada. */
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <nav class="Navbar">

                <div class="boton-categorias">
                    {/* Este boton es el boton de categorías que cambia si esta abierto o cerrado */}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ "backgroundColor": "transparent", "borderColor": "transparent", marginTop: "5px" }}>
                        {isSidebarOpen ? <Icon icon="ic:baseline-menu-open" style={{ fontSize: "32px" }} /> : <Icon icon="ic:baseline-menu" style={{ fontSize: "31px" }} />}
                    </button>
                </div>

                {links.map(x => (
                    <div class="categorias">
                        <NavLink to={x.href}>
                            <p class="cat-nav">{x.name}</p>
                        </NavLink>
                    </div>
                ))}

            </nav>

            {/* Aquí se recorre el contenido de la funcion links que se muestran con el botón en el navbar cuando se hace usa en celular, table o laptop pequeña */}
            {links.map((link, index) => (
                <div class="lista-categorias" style={{ display: isSidebarOpen ? "grid" : "none" }} key={index}>
                    <div key={index}>
                        <div class="cat-bar">
                            <NavLink to={link.href}>{link.name}</NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const FooterInicio = () => {
    return (
        <div className='container-footer'>
            <div className='informacion'>
                <div className='inf-column'>
                    <img src="/images/ubicacion.png" alt="Ubicacion" />
                    <p className='texto-info'>C. Morelos 442, Centro, 43000 Huejutla, Hgo</p>
                </div>
                <NavLink to="">
                <div className='inf-column'>
                    <img src="images/email.png" alt="Email" />
                    
                        <p className='texto-info'>Robopits@gmail.com</p>
                    
                </div>
                </NavLink>
                <div className='inf-column'>
                    <img src="images/whatsapp.png" alt="WhatsApp" />
                    <p className='texto-info'>+52 7713926338
                    <br/> +52 7711322841</p>
                </div>
                <NavLink to="">
                <div className='inf-column'>
                    <img src="images/facebook.png" alt="Facebook" />
                    
                        <p className='texto-info'>roboPits</p>
                    
                </div>
                </NavLink>
            </div>

            <div className='inf-empresa'>
                <p className='texto-info2'>© 2023 Componentes electrónicos RoboPits</p>
                <NavLink to="">
                    <p className='texto-info2'>Avisos de privacidad</p>
                </NavLink>
                <NavLink to="">
                    <p className='texto-info2'>Términos y condiciones</p>
                </NavLink>
                <NavLink to="">
                    <p className='texto-info2'>¿Quiénes somos?</p>
                </NavLink>
            </div>
            <div className='logo-footer'>
                <img src="images/robopits-transparente2.png" alt="RoboPits" />
                <h1 className='robopits-footer'>RoboPits</h1>
            </div>
        </div>
    );
};

export const Carrusel = () => {
    return (
        <div className='contenedor-carrusel'>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <img src="" alt="" />
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                            <button class="card-button">More info</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div class="contenedor-cards">
                        <div class="card">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const BotonLogin = () => {
    return (
        <NavLink to="/login">
            <div class="Login">
                Iniciar sesión
            </div>
        </NavLink>
    );
};

const BotonRegistro = () => {
    return (
        <NavLink to="/registro ">
            <div class="Registro">
                Registro
            </div>
        </NavLink>
    );
};

const links = [
    {
        name: "Sensores",
        href: "/sensores"
    },
    {
        name: "Módulos",
        href: "/modulos"
    },
    {
        name: "Arduino&NodeMCU",
        href: "/arduino"
    },
    {
        name: "Soldadura",
        href: "/soldadura"
    },
    {
        name: "Protoboard",
        href: "/protoboard"
    },
    {
        name: "Microcontroladores",
        href: "/microcontroladores"
    },
    {
        name: "Motores",
        href: "/motores"
    },
    {
        name: "Botones",
        href: "/botones"
    },
    {
        name: "Potenciómetros",
        href: "/potenciometros"
    },
    {
        name: "Todos los productos",
        href: "/todos-los-productos"
    },

];