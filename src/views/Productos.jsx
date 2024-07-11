import React, { useState, useEffect } from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


const Productos = () => {

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

  const URL = "https://backend-robo.vercel.app/api/productos";

  const showData = async () => {
    try {
      const response = await axios.get(URL);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const results = !search ? productos : productos.filter((dato) => dato.NameProducto.toLowerCase().includes(search.toLocaleLowerCase()))

  useEffect(() => {
    showData();
  }, []);

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
            {results.map((productos) => (
              <div className='w-full h-full' key={productos._id}>
                <NavLink to={`/resena-producto/${productos._id}`}>
                  {/*ESTA ES LA CARD DE LOS PRODUCTOS */}
                  <div class="card w-auto h-auto p-2 bg-gray-100 relative overflow-visible shadow-md">
                    <div class="card-img bg-white h-24 rounded-md transition-transform duration-300 hover:translate-y-3 w-auto h-auto">
                      <img src={productos.Imagen} alt={productos.NameProducto} className='w-auto h-auto mx-auto' />
                    </div>
                    <div class="card-info pt-6 grid">
                      <div className='flex w-auto justify-between'>
                        <p class="text-title font-bold text-lg overflow-hidden line-clamp-1">{productos.NameProducto}</p>
                        <div class="card-button border border-gray-900 flex items-center justify-center p-1 rounded-full cursor-pointer transition duration-300 ease-in-out hover:border-sky-400 bg-white hover:bg-sky-400">
                          <NavLink to="">
                            <Icon icon="mdi:heart-outline" className='text-black' />
                          </NavLink>
                        </div>
                      </div>
                      <p class="text-body text-sm overflow-hidden line-clamp-2">{productos.Descripcion}</p>
                    </div>
                    <div class="card-footer flex justify-between items-center pt-2 border-t border-gray-300">
                      <span class="text-title font-bold">${productos.Precio}</span>
                      <div class="card-button border border-gray-900 flex items-center justify-center p-1 rounded-full cursor-pointer transition duration-300 ease-in-out hover:border-sky-400 bg-white hover:bg-sky-400">
                        <NavLink to="">
                          <Icon icon="mdi:cart-outline" className='text-black' />
                        </NavLink>
                      </div>
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

export default Productos
