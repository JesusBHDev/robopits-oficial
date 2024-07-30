import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductosPorCategoria } from '../api/auth'; // Asegúrate de que la ruta está correctamente definida
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const ProductosPorCategoria = () => {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const userInput = e.target.value;
        setSearch(sanitizeInput(userInput));
    };

    const sanitizeInput = (input) => {
        // Eliminar cualquier carácter que sea una comilla simple o doble
        // Esto ayuda a prevenir la inyección de SQL
        return input.replace(/['"]/g, '');
    };

    useEffect(() => {
        obtenerProductosPorCategoria(id)
            .then(response => {
                setProductos(response.data); // Asumiendo que la respuesta de la API es directamente el array de productos
            })
            .catch(error => console.log('Error al obtener productos:', error));
    }, [id]);

    const filteredProducts = !search ? productos : productos.filter((producto) =>
        producto.NameProducto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <HeaderInicio />
            <div className='w-auto h-auto'>
                <div className='grid place-items-center w-auto'>
                    <input
                        value={search}
                        onChange={handleChange}
                        type="search"
                        placeholder="Buscar"
                        className="w-1/5 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className='flex justify-center my-10'>
                    <div className='w-11/12 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center'>
                        {filteredProducts.map((producto) => (
                            <div className='w-full h-full' key={producto._id}>
                                <NavLink to={`/resena-producto/${producto._id}`}>
                                    {/*ESTA ES LA CARD DE LOS PRODUCTOS */}
                                    <div className="card w-auto h-auto p-2 bg-gray-100 relative overflow-visible shadow-md">
                                        <div className="card-img bg-white h-24 rounded-md transition-transform duration-300 hover:translate-y-3 w-auto h-auto">
                                            <img src={producto.Imagen} alt={producto.NameProducto} className='w-auto h-auto mx-auto' />
                                        </div>
                                        <div className="card-info pt-6 grid">
                                            <div className='flex w-auto justify-between'>
                                                <p className="text-title font-bold text-lg overflow-hidden line-clamp-1">{producto.NameProducto}</p>
                                            </div>
                                            <p className="text-body text-sm overflow-hidden line-clamp-2">{producto.Descripcion}</p>
                                        </div>
                                        <div className="card-footer flex justify-between items-center pt-2 border-t border-gray-300">
                                            <span className="text-title font-bold">${producto.Precio}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default ProductosPorCategoria;
