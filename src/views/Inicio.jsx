import React from 'react'
import { HeaderInicio } from "../components/componentes-inicio";
import { FooterInicio } from '../components/componentes-inicio';
const Inicio = () => {
  return (
    <div>
      <HeaderInicio />
      <div>
        <h1 className='tituloB'>Inicio</h1>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Inicio
