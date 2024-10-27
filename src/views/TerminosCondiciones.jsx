// TerminosCondiciones.jsx

import React from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import '../css/TerminosCondiciones.css'; // Asegúrate de tener tu archivo CSS correspondiente

const TerminosCondiciones = () => {
    return (
        <div>
            <HeaderInicio />
            <div className="terminos-condiciones-container">
                <h2 className="titulo-seccion">Términos y Condiciones</h2>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">1. Aceptación de Términos</h3>
                    <p className="parrafo">
                        Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">2. Uso del Contenido</h3>
                    <p className="parrafo">
                        El contenido de este sitio web es solo para fines informativos y educativos. No está permitido su uso indebido.
                    </p>
                </div>

                {/* Agrega más secciones según sea necesario */}

                <div className="seccion">
                    <h3 className="subtitulo-seccion">Última actualización: [Fecha]</h3>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default TerminosCondiciones;
