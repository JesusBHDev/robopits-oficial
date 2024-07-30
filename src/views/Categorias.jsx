import React, { useState, useEffect } from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { getAllCategorias } from '../api/auth.js';
import { Link } from 'react-router-dom';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    const showData = async () => {
        try {
            const response = await getAllCategorias();
            console.log(response);
            setCategorias(response.data);
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
                        {categorias.map((categoria) => (
                            <Link to={`/categoria/${categoria._id}`} key={categoria._id} className="card w-auto h-auto p-2 bg-gray-100 relative overflow-visible shadow-md transition-transform duration-300 hover:translate-y-1">
                                <div className="card-info grid">
                                    <div className='flex w-auto justify-between'>
                                        <p className="text-title font-bold text-lg">{categoria.NameCategoria}</p>
                                    </div>
                                    <p className="text-body pt-2 text-sm">¡Échale un vistazo a nuestras categorías!</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default Categorias;
