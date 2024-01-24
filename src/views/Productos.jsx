import React from 'react'
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio';

const Productos = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>Productos</h1>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Productos