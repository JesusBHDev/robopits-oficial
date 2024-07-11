// QuienesSomos.jsx
import React from 'react';
import {FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import DetalleCarrito from '../components/DetalleCarrito.jsx';

const QuienesSomos = () => {
    return (
        <div>
            <HeaderInicio />
            <div className='w-4/5 mx-auto'>
                <DetalleCarrito/>
            </div>
            <FooterInicio />
        </div>
    );
};

export default QuienesSomos;
