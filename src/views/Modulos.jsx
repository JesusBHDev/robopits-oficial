import React from 'react'
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio';

const Modulos = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>Modulos</h1>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Modulos