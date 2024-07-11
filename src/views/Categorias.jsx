import React, { useState, useEffect } from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';

import axios from 'axios'; // Importa Axios

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    const URL = "https://prueba1-pied-seven.vercel.app/api/categorias";

    const showData = async () => {
        try {
            const response = await axios.get(URL); // Utiliza Axios para realizar la solicitud HTTP
            console.log(response); // Verifica la respuesta de la API en la consola
            setCategorias(response.data); // Establece los categorias en el estado
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };


    useEffect(() => {
        showData();
    }, []);

    return (
        <div>
            <HeaderInicio />
            <div className='w-auto h-auto'>
                <div className='flex justify-center my-10'>
                    <div className='w-11/12 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center'>
                        {/*ESTA ES LA CARD DE LAS CATEGORIAS */}
                        {categorias.map((categoria) => (
                            <div class="card w-auto h-auto p-2 bg-gray-100 relative overflow-visible shadow-md transition-transform duration-300 hover:translate-y-1">
                                <div class="card-info grid">
                                    <div className='flex w-auto justify-between'>
                                        <p class="text-title font-bold text-lg">{categoria.NameCategoria}</p>
                                    </div>
                                    <p class="text-body pt-2 text-sm">¡Échale un vistazo a nuestras categorías!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default Categorias;
