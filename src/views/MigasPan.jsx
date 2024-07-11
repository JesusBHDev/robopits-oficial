import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import axios from 'axios';

const MigasPan = () => {
  const [productos, setProductos] = useState([]);

  const URL = "https://backend-robo.vercel.app/api/productos";

  const showData = async () => {
    try {
      const response = await axios.get(URL);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    // Suponiendo que productos es un array de objetos con _id y NameProducto
    productos.forEach((producto) => {
      setRouteToComponent((prevRoutes) => ({
        ...prevRoutes,
        [`/resena-producto/${producto._id}`]: `${producto.NameProducto}`,
      }));
    });
  }, [productos]);

  const pathnames = window.location.pathname.split('/').filter((x) => x);

  const [routeToComponent, setRouteToComponent] = useState({
    '/': 'Home',
    // Agrega aquí más mapeos según tus rutas y nombres de componentes
    '/quienes-somos': '¿Quiénes somos?',
    '/categorias': 'Categorías',
    '/todos-los-productos': 'Todos los productos',
    '/avisos-de-privacidad': 'Avisos de privacidad',
    '/terminos-y-condiciones': 'Términos y condiciones',
    '/preguntas-frecuentes': 'Preguntas frecuentes',
    '/resena-producto' : 'Reseña de producto',
    '/propuesta': 'Propuesta',
  });


  return (
    <div className="container mx-auto my-4 animate__animated animate__bounceInDown">
      <div className="flex items-center text-sm">
        <Link to="/" className="font-sans text-blue-400 hover:underline font-bold">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const componentName = routeToComponent[routeTo] || name;

          return (
            <span key={name} className="flex items-center">
              <span className="font-sans mx-2 text-gray-500 font-thin"> / </span>
              {isLast ? (
                <span className="font-sans text-gray-500">{componentName}</span>
              ) : (
                <Link to={routeTo} className="font-sans text-blue-500 hover:underline">{componentName}</Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MigasPan
