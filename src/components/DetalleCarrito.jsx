// src/components/ShoppingCart.js
import React, { useState } from 'react';
import { Button } from 'antd';
import { Icon } from "@iconify/react";

const cartItems = [
    {
        id: 1, image: 'images/kit-soldador.webp', name: 'Sensor hall',
        description: 'SS49E Sensor Efecto Hall es un sensor magneto-resistivo que opera con base en un campo magnético proporcionado por un imán permanente o un electroimán sin la necesidad de contacto físico. Este sensor brinda un voltaje de salida en función de su voltaje de entrada y varía en proporción con la fuerza del campo magnético que detecta, también es un dispositivo de bajo consumo de energía ya que puede manejar voltajes de entrada desde 2.7 V y corrientes de operación de 6 mA a 5 V. SS49E Sensor Efecto Hall posee circuitería interna que reduce el ruido generado en la salida y hace innecesario el uso de filtros externos, posee una variante del encapsulado TO-92 llamado Flat TO-92 o TO-92S que es más pequeño y permite poner más componentes en el circuito. Es capaz de detectar hacia donde va dirigido el campo magnético y es ideal para censar las revoluciones de un motor, control de bombas en equipos pesados y electrodomésticos, detección de desplazamiento lineal o angular, censar la posición del manubrio en bicicletas electrónicas y scooters, entre muchas otras aplicaciones.', price: 14.99, quantity: 1
    },

    { id: 2, image: 'images/kit-soldador.webp', name: 'ARDUINO Mega 2560 con cable USB', 
    description: 'El Arduino mega es una placa electrónica compatible con Arduino basada en el microprocesador Atmega 2560. Contiene todo lo necesario para apoyar al microcontrolador; basta con conectarlo a un ordenador con un cable USB, un eliminador de CA o una batería CD. ', price: 19.99, quantity: 1 
    },

    { id: 3, image: 'images/kit-soldador.webp', name: 'Protoboard 1660 puntos.', 
    description: 'Placa de Prueba con 1660 puntos, diseñado para armar circuitos electrónicos sin necesidad de soldadura.', price: 29.99, quantity: 1 
    },
];

export default function DetalleCarrito() {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [expanded, setExpanded] = useState({});  // State to handle expanded descriptions

    const toggleDescription = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
            <h1 className="text-2xl font-bold mb-8">Carrito de compras</h1>
            <div>
                <h1 className='font-semibold text-gray-800 text-lg mb-4'>Artículos del carrito</h1>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2 h-auto">
                        <img src={item.image} alt="Product" width={70} height={70} className="rounded-md" />
                        <div className="w-2/3 mx-2 h-auto">
                            <p className='font-semibold text-gray-800'>{item.name}</p>
                            <div className="text-gray-500 text-sm">
                                {expanded[item.id] ? item.description : `${item.description.substring(0, 50)}...`}
                                <button onClick={() => toggleDescription(item.id)} className="text-blue-500">
                                    {expanded[item.id] ? 'Ver menos' : 'Ver más'}
                                </button>
                            </div>
                        </div>
                        <div className='md:flex'>
                            <span className="font-semibold mx-5">${item.price.toFixed(2)}</span>
                            <div className="flex items-center mt-3 md:mt-0">
                                <Button type="primary" size="small" onClick={() => { }}>
                                    <Icon icon="mdi:minus" />
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button type="primary" size="small" onClick={() => { }}>
                                    <Icon icon="mdi:plus" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div className="text-lg mt-8">
                    <p className='font-medium'>Total:</p>
                    <p className='text-2xl font-bold'>${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-end">
                    <button className="mt-4 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded justify-end flex">
                        Continuar compra
                    </button>
                </div>
            </div>
        </div>
    );
}
