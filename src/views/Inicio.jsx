import React from 'react'
import { Carrusel } from "../components/componentes-inicio";
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio';
const Inicio = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>Inicio</h1>
        <Carrusel/>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Inicio
