import React, { useState, useEffect } from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { Icon } from '@iconify/react';
import { NavLink, useParams } from 'react-router-dom';
import { Image } from "antd";
import CustomDropdown from '../components/CustomDropdown.jsx';
import ToggleDiv from '../components/ToggleDiv.jsx';
import { getProducto, agregarAlCarrito } from '../api/auth.js';
import { useAuth } from "../context/AuthContext.jsx";

const options = [
    { key: '1', label: '1 unidad' },
    { key: '2', label: '2 unidades' },
    { key: '3', label: '3 unidades' },
    { key: '4', label: '4 unidades' },
    { key: '5', label: '5 unidades' },
    { key: '6', label: '6 unidades' },
];

const ResenaProducto = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [expanded, setExpanded] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getProducto(id);
            setProducto(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setLoading(false);
        }
    };

    const handleAgregarAlCarrito = async () => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        try {
            await agregarAlCarrito(user.id, producto._id, cantidad);
            alert('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            alert('Hubo un error al agregar el producto al carrito');
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <HeaderInicio />
            <div className="w-auto h-auto">
                {loading ? (
                    <div className="flex flex-col bg-neutral-300 mx-auto my-5 animate-pulse rounded-xl p-4 gap-4 justify-center w-4/5 h-auto">
                        <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                        <div className="flex flex-col gap-2">
                            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                            <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto md:w-4/5 grid md:flex border rounded border-2 bg-white md:my-5">
                        {producto && (
                            <div className=''>
                                <div className="flex flex-col md:flex-row md:items-center w-auto mx-auto">
                                    <div className="md:w-1/2 w-auto p-4">
                                        <Image
                                            className="h-auto w-auto mx-auto"
                                            src={producto.Imagen}
                                            alt={producto.NameProducto}
                                        />
                                    </div>

                                    <div className="md:w-1/2 w-auto mx-auto p-5">
                                        <div className="w-auto  flex justify-between items-center">
                                            <h2 className="text-2xl font-bold">{producto.NameProducto}</h2>
                                            <div className="flex items-center">
                                                <NavLink to="">
                                                    <Icon icon="mdi:heart-outline" className="text-black hover:text-blue-500 transition-all duration-300 ease-in-out" />
                                                </NavLink>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl mt-2">${producto.Precio}</h2>
                                        <p className={`text-base w-auto mt-4 text-gray-500 ${expanded ? '' : 'line-clamp-3'}`}>
                                            {producto.Descripcion}
                                        </p>
                                        <button onClick={toggleDescription} className="text-blue-500">
                                            {expanded ? 'Ver menos' : 'Ver más'}
                                        </button>
                                        <div className="flex mt-4">
                                            <CustomDropdown options={options} onSelect={(key) => setCantidad(Number(key))} />
                                            <p className="ml-2 text-base">(+{producto.Existencias} disponibles)</p>
                                        </div>

                                        <div className="flex space-x-2 mt-4 md:w-full w-auto">
                                            <button type="submit" className="bg-[#3BA4F6] text-white rounded p-2 font-bold md:w-44 w-auto hover:bg-[#2587eb]">Comprar ahora</button>
                                            <button type="button" onClick={handleAgregarAlCarrito} className="bg-[#4db4b2] text-white rounded p-2 font-bold md:w-44 w-auto hover:bg-[#329696]">Agregar al carrito</button>
                                        </div>

                                        <div className="mt-4 md:w-full w-20 mx-auto">
                                            <ToggleDiv title="Características" content={producto.Caracteristicas} />
                                            <ToggleDiv title="Categoría" content={producto.Categoria} />
                                            <ToggleDiv title="¿Qué incluye?" content={producto.Incluye} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <FooterInicio />
        </div>
    );
};

export default ResenaProducto;