import React from 'react'
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio'
import '../css/Bienvenida.css'
const Bienvenida = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>¡Hola, te damos la bienvenida!</h1>
        <h3 className='subtituloB'>Compra aquí tus componentes electrónicos, herramientas y más...</h3>
      </div>
      <FooterInicio />
    </div>
  );
};

export default Bienvenida;
