import React from 'react';

function Componente1() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-xl font-bold mb-4">
        Componente Boton de Agregar al carrito un producto
      </h1>
      <button className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
        Agregar al carrito
      </button>
    </div>
  );
}

export default Componente1;
