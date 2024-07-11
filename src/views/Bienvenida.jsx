import React from 'react'
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio'
import '../css/Bienvenida.css'
import { Card } from 'antd';
import { Carousel } from 'flowbite-react';
const { Meta } = Card;
const Bienvenida = () => {
  return (
    <div>
      <HeaderInicio />
      <div className="container-bienvenida">

        <div className="grid text-center">
          <h1 className='text-4xl text-blue-400 font-bold'>¡Hola, te damos la bienvenida!</h1>
          <h3 className='text-lg '>Compra aquí tus componentes electrónicos, herramientas y más...</h3>
        </div>

        <div className="place-content-center my-7">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={2000}>
              <img src="images/productos/componentes/arduino.webp" alt="Arduino" />
              <img src="images/productos/herramientas/soldar.webp" alt="Soldar" />
              <img src="images/productos/cables/cables.webp" alt="Cables" />
              <img src="images/productos/kits/kits.webp" alt="Kits" />
            </Carousel>
          </div>
        </div>

        <h1 className='text-xl text-teal-500 font-sans font-bold text-center mt-5 mb-10'>¡Descubre nuestras categorías destacadas!</h1>
        <div className='flex flex-wrap justify-center'>
      <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4'>
        <Card
          className='w-10/12 text-center'
          hoverable
          cover={<img alt="Componentes" src="images/productos/componentes/arduino.webp" />}
        >
          <Meta title="Componentes" description="Arduino, NodeMCU y más..." />
        </Card>
      </div>
      <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4'>
        <Card
          className='w-10/12 text-center'
          hoverable
          cover={<img alt="Herramientas" src="images/productos/herramientas/soldar.webp" />}
        >
          <Meta title="Herramientas" description="Cautín, Estaño, pinzas y más..." />
        </Card>
      </div>
      <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4'>
        <Card
          className='w-10/12 text-center'
          hoverable
          cover={<img alt="Cables" src="images/productos/cables/cables.webp" />}
        >
          <Meta title="Cables" description="Jumpers, Cargadores y más..." />
        </Card>
      </div>
      <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4'>
        <Card
          className='w-10/12 text-center'
          hoverable
          cover={<img alt="Kits" src="images/productos/kits/kits.webp" />}
        >
          <Meta title="Kits" description="Kits de Arduino y más..." />
        </Card>
      </div>
    </div>

      </div>
      <FooterInicio />
    </div>
  );
};

export default Bienvenida;

