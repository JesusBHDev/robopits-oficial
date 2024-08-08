// QuienesSomos.jsx
import React from 'react';
import {FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import DetalleCarrito from '../components/DetalleCarrito.jsx';

const QuienesSomos = () => {
    return (
        <div>
            <HeaderInicio />
            <div className=" p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Quiénes Somos</h1>

        {/* Sección de Misión */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">Misión</h2>
          <p className="text-lg text-gray-700">
            En RoboPits, nuestra misión es proporcionar componentes electrónicos de alta calidad
            que impulsen la innovación y el desarrollo tecnológico, apoyando a ingenieros y
            entusiastas en la creación de proyectos que transformen el futuro.
          </p>
        </section>

        {/* Sección de Visión */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">Visión</h2>
          <p className="text-lg text-gray-700">
            Aspiramos a ser líderes Regionales en la distribución de componentes electrónicos,
            facilitando el acceso a tecnología avanzada y contribuyendo al avance global en la
            robótica y la automatización.
          </p>
        </section>

        {/* Sección de Valores */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">Valores</h2>
          <ul className="text-lg text-gray-700 list-disc list-inside">
            <li>Innovación: Fomentamos un ambiente creativo y promovemos soluciones innovadoras.</li>
            <li>Calidad: Nos comprometemos a ofrecer productos que cumplen con los más altos estándares.</li>
            <li>Integridad: Actuamos con honestidad y responsabilidad en todas nuestras acciones.</li>
            <li>Colaboración: Trabajamos juntos para alcanzar metas comunes y superar desafíos.</li>
            <li>Satisfacción del Cliente: Nos dedicamos a satisfacer y superar las expectativas de nuestros clientes.</li>
          </ul>
        </section>

        {/* Sección de Equipo */}
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">Nuestro Equipo</h2>
          <p className="text-lg text-gray-700 mb-4">
            Nuestro equipo está compuesto por profesionales apasionados y expertos en tecnología
            que comparten un compromiso por la excelencia y la innovación.
          </p>
          <div className="flex flex-wrap justify-center">
            <div className="bg-white shadow-md rounded-lg p-4 m-4 max-w-xs">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="images/robopits-pequeño.webp"
                alt="John Doe"
              />
              <h3 className="text-xl font-semibold">Ing Oscar Ivan Bautista Antonio</h3>
              <p className="text-gray-600">CEO</p>
            </div>
           
            {/* Añadir más miembros del equipo según sea necesario */}
          </div>
        </section>
      </div>
    </div>
            <FooterInicio />
        </div>
    );
};

export default QuienesSomos;
