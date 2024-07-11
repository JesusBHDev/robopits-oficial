import React, { useState } from 'react';

function CalculadoraUsuarios() {
  const [usuariosMes0, setUsuariosMes0] = useState(30);
  const [usuariosMes1, setUsuariosMes1] = useState(40);
  const [usuariosMes2, setUsuariosMes2] = useState(null);
  const [constanteProporcionalidad, setConstanteProporcionalidad] = useState(null);

  const calcularUsuariosMes2 = () => {
    const k = Math.log(usuariosMes1 / usuariosMes0); // Calcular la constante de proporcionalidad
    setConstanteProporcionalidad(k);
    const usuariosMes2 = usuariosMes0 * Math.exp(k * 2); // Calcular el número de usuarios en el mes 2
    setUsuariosMes2(Math.round(usuariosMes2 * 100) / 100); // Redondear el resultado a dos decimales
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg h-28">
      <h1 className="text-3xl font-bold mb-4 text-center">Calculadora de Usuarios</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-700">Usuarios registrados en el mes de marzo:</label>
          <input
            type="number"
            value={usuariosMes0}
            onChange={(e) => setUsuariosMes0(parseInt(e.target.value))}
            className="block w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Usuarios registrados en el mes de abril:</label>
          <input
            type="number"
            value={usuariosMes1}
            onChange={(e) => setUsuariosMes1(parseInt(e.target.value))}
            className="block w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div></div>
      <button onClick={calcularUsuariosMes2} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full">
        Calcular Usuarios  para el Mes de mayo
      </button>
      {usuariosMes2 && constanteProporcionalidad && (
        <div className="mt-6">
          <p className="text-gray-800">El valor de la constante de proporcionalidad (k) es: {constanteProporcionalidad}</p>
          <p className="text-gray-800">El número de usuarios en el mes de mayo sera: {usuariosMes2} usuarios</p>
        </div>
      )}
    </div>
  );
}

export default CalculadoraUsuarios;
