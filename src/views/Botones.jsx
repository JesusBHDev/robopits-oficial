import React from 'react'
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio';
const Botones = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>Botones</h1>
      </div>
      <FooterInicio />

    </div>
  )
}

export default Botones