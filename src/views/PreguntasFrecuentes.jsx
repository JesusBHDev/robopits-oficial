import React, { useState } from 'react'
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio'
import RoboChat from '../components/RoboChat.jsx';
import { Icon } from '@iconify/react';

const PreguntasFrecuentes = () => {
    const [preguntas, setPreguntas] = useState([
        {
            pregunta: "¿Qué es Tailwind CSS?",
            respuesta: "Tailwind CSS es un framework de estilos CSS que te permite crear interfaces de usuario con rapidez y facilidad.",
        },
        {
            pregunta: "¿Cómo funciona Tailwind CSS?",
            respuesta: "Tailwind CSS te proporciona una serie de clases de utilidad que puedes usar para aplicar estilos a tus elementos HTML.",
        },
        {
            pregunta: "¿Cuáles son las ventajas de usar Tailwind CSS?",
            respuesta: "Tailwind CSS es rápido, flexible y fácil de usar. Te permite crear interfaces de usuario receptivas y personalizadas sin necesidad de escribir código CSS personalizado.",
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
            <div className='container'>
                <div className="py-12">
                    <h2 className="text-center text-3xl font-bold mb-8">Preguntas frecuentes</h2>
                    <ul className="list-none mx-auto w-full max-w-md">
                        {preguntas.map((pregunta, index) => (
                            <li key={index} className="border-b border-gray-300 hover:bg-slate-200 rounded">
                                <button
                                    className="flex items-center justify-between w-full p-4 text-xl font-bold text-gray-700 hover:text-sky-500 active:text-sky-500 focus:text-sky-500"
                                    onClick={() => handlePreguntaClick(index)}
                                >
                                    {pregunta.pregunta}
                                    <span className="ml-2">
                                        {pregunta.respuestaVisible ? <Icon icon="mdi:minus" className='text-sky-700 hover:text-sky-500'/> : <Icon icon="mdi:plus" className='text-sky-700 hover:text-sky-500'/>}
                                    </span>
                                </button>
                                {pregunta.respuestaVisible && (
                                    <p className="mt-3 mb-3 text-gray-600">{pregunta.respuesta}</p>
                                )}
                            </li>
                        ))}
                    </ul>
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
