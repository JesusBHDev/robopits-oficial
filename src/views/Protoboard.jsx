import React from 'react'
import { FooterInicio, HeaderInicio, NavbarInicio } from '../components/componentes-inicio';

const Protoboard = () => {
  return (
    <div>
      <HeaderInicio />
      <NavbarInicio />
      <div>
        <h1 className='tituloB'>Protoboard</h1>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Protoboard