import React, { useState } from 'react'
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio'
import RoboChat from '../components/RoboChat.jsx';
import { Icon } from '@iconify/react';

const PreguntasFrecuentes = () => {
    const [preguntas, setPreguntas] = useState([
        {
            pregunta: "¿Dónde puedo pasar a recoger mi pedido?",
            respuesta: "Hacemos entregas en el centro de Huejutla y Parque de Poblamiento.",
        },
        {
            pregunta: "¿Dónde se ubican?",
            respuesta: "C. Morelos 442, Centro, 43000 Huejutla, Hgo.",
        },
        {
            pregunta: "¿Cómo puedo contactarlos?",
            respuesta: (
                <ul>
                    <li className='font-bold'>Email: <a href="mailto:Robopits@gmail.com">Robopits@gmail.com</a></li>
                    <li>WhatsApp: <a>+52 7713926338</a>, <a>+52 7711322841</a></li>
                    <li>Facebook: <a href="https://facebook.com/roboPits" target="_blank" rel="noopener noreferrer">roboPits</a></li>
                </ul>
            ),
        },
        {
            pregunta: "¿Venden piezas por mayoreo?",
            respuesta: "Disculpa... Por el momento solo manejamos menudeo.",
        },
        {
            pregunta: "¿Cuál es su horario de servicio?",
            respuesta: "Todos los días de 9am a 1pm y de 2pm a 7pm, Domingo sin servicio :).",
        },
    ]);

    const handlePreguntaClick = (index) => {
        const nuevaPreguntas = [...preguntas];
        nuevaPreguntas[index].respuestaVisible = !nuevaPreguntas[index].respuestaVisible;
        setPreguntas(nuevaPreguntas);
    };

    return (
        <div>
            <HeaderInicio />
            <div className='w-auto h-auto'>
                <div className="py-4">
                    <h2 className="text-center text-3xl font-bold mb-8">Preguntas frecuentes</h2>
                    <div className='w-4/5 mx-auto'>
                        <ul className="list-none mx-auto w-full">
                            {preguntas.map((pregunta, index) => (
                                <li key={index} className="border-b border-gray-300 hover:bg-slate-200 rounded">
                                    <button
                                        className="flex items-center justify-between w-full p-4 text-xl font-bold text-gray-700 hover:text-sky-500 active:text-sky-500 focus:text-sky-500"
                                        onClick={() => handlePreguntaClick(index)}
                                    >
                                        {pregunta.pregunta}
                                        <span className="ml-2">
                                            {pregunta.respuestaVisible ? <Icon icon="mdi:minus" className='text-sky-700 hover:text-blue-500' /> : <Icon icon="mdi:plus" className='text-sky-700 hover:text-blue-500' />}
                                        </span>
                                    </button>
                                    {pregunta.respuestaVisible && (
                                        <div className="mt-3 mb-3 text-gray-600">
                                            {typeof pregunta.respuesta === 'string' ?
                                                <p>{pregunta.respuesta}</p> : // Envuelve texto simple en un párrafo
                                                pregunta.respuesta // Mantiene las listas como están
                                            }
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='h-96'>
                <RoboChat />
            </div>
            <FooterInicio />
        </div>
    )
}

export default PreguntasFrecuentes

