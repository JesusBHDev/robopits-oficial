// AvisosPrivacidad.jsx

import React from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import '../css/AvisosPrivacidad.css'; // Asegúrate de tener tu archivo CSS correspondiente

const AvisosPrivacidad = () => {
    return (
        <div>
            <HeaderInicio/>
            <div className="avisos-privacidad-container">
                <h2 className="titulo-seccion">Avisos de Privacidad</h2>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">1. Información Recopilada</h3>
                    <p className="parrafo">
                        Recopilamos información personal con el único propósito de mejorar nuestros servicios y personalizar tu experiencia.
                    </p>
                </div>

                <div className="seccion">
                    <h3 className="subtitulo-seccion">2. Uso de la Información</h3>
                    <p className="parrafo">
                        La información recopilada se utiliza para proporcionar y mejorar nuestros servicios, y no se comparte con terceros sin tu consentimiento.
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

export default AvisosPrivacidad;
