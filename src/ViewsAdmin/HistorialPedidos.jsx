import React, { useState, useEffect } from 'react';
import { obtenerHistorialDePedidos } from '../api/auth.js';
import { EncabezadoAdmin } from './ComponenetesAdmin/Encabezado';
import moment from 'moment';

function HistorialPedidos() {
  const [historial, setHistorial] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);

  useEffect(() => {
    async function fetchHistorial() {
      try {
        const response = await obtenerHistorialDePedidos();
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de pedidos:', error);
      }
    }

    fetchHistorial();
  }, []);

  return (
    <div>
      <EncabezadoAdmin />
      <div className="pt-20 px-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
        <div>
          {historial.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {historial.map((pedido) => (
                <li
                  key={pedido._id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <p>
                    <strong>Cliente:</strong>{' '}
                    {pedido.informacion.cliente.nombre}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.informacion.estado}
                  </p>
                  <p>
                    <strong>Punto de Retiro:</strong>{' '}
                    {pedido.informacion.puntoDeRetiro}
                  </p>
                  <p>
                    <strong>Fecha del pedido:</strong>{' '}
                    {moment(pedido.informacion.createdAt).format(
                      'DD/MM/YYYY HH:mm'
                    )}
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => setSelectedPedido(pedido)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Ver Pedido
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay pedidos en el historial.</p>
          )}
        </div>
        {selectedPedido && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow w-11/12 h-5/6 overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedPedido(null)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Pedido Detalles</h2>
              <p>
                <strong>Pedido ID:</strong> {selectedPedido._id}
              </p>
              <p>
                <strong>Fecha del pedido:</strong>{' '}
                {moment(selectedPedido.informacion.createdAt).format(
                  'DD/MM/YYYY HH:mm'
                )}
              </p>
              <p>
                <strong>Cliente:</strong>{' '}
                {selectedPedido.informacion.cliente.nombre}
              </p>
              <p>
                <strong>Total:</strong> ${selectedPedido.informacion.total}
              </p>
              <p>
                <strong>Total de productos:</strong>{' '}
                {selectedPedido.informacion.totalproductos}
              </p>
              <p>
                <strong>Estado:</strong> {selectedPedido.informacion.estado}
              </p>
              <p>
                <strong>Dirección:</strong>{' '}
                {selectedPedido.informacion.direccion}
              </p>
              <p>
                <strong>Punto de Retiro:</strong>{' '}
                {selectedPedido.informacion.puntoDeRetiro}
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Productos:</h3>
              <ul>
                {selectedPedido.informacion.productos.map((producto) => (
                  <li key={producto.productId} className="mb-2">
                    <img
                      src={producto.image}
                      alt={producto.name}
                      className="w-16 h-16 rounded-md shadow-sm"
                    />
                    <p>
                      <strong>Producto:</strong> {producto.name}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> {producto.quantity}
                    </p>
                    <p>
                      <strong>Precio:</strong> ${producto.price}
                    </p>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedPedido(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorialPedidos;
