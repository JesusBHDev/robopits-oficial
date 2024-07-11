import React, { useState, useEffect } from 'react';
import { obtenerPedidosCliente } from '../api/auth.js'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../context/AuthContext.jsx';

function Pedido() {
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                setLoading(true);
                const response = await obtenerPedidosCliente(user.id);
                setPedidos(response.data.pedidos); // Aquí accede a response.data.pedidos
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los pedidos');
                setLoading(false);
            }
        };

        if (user && user.id) {
            fetchPedidos();
        }
    }, [user]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
          {pedidos.length > 0 ? (
            <ul className="space-y-4">
              {pedidos.map(pedido => (
                <li key={pedido._id} className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2">Pedido ID: {pedido._id}</h2>
                  <p className="mb-1"><span className="font-bold">Total:</span> ${pedido.total}</p>
                  <p className="mb-1"><span className="font-bold">Estado:</span> {pedido.estado}</p>
                  <p className="mb-1"><span className="font-bold">Dirección:</span> {pedido.direccion}</p>
                  <p className="mb-1"><span className="font-bold">Punto de Retiro:</span> {pedido.puntoDeRetiro}</p>
                  <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Productos</h3>
                    <ul className="space-y-2">
                      {pedido.productos.map(producto => (
                        <li key={producto.productId} className="flex items-center">
                          <img src={producto.image} alt={producto.name} className="w-16 h-16 object-cover rounded mr-4" />
                          <div>
                            <p className="mb-1"><span className="font-bold">Producto:</span> {producto.name}</p>
                            <p className="mb-1"><span className="font-bold">Cantidad:</span> {producto.quantity}</p>
                            <p className="mb-1"><span className="font-bold">Precio:</span> ${producto.price}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes pedidos aún.</p>
          )}
        </div>
      );
};

export default Pedido;
