//FRONTEND
import React, { useState, useEffect } from 'react';
import { obtenerPedidosCliente } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { Image } from "antd";

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
        setPedidos(response.data.pedidos); // Asegúrate de que esto coincida con cómo tu backend envía los datos
        setLoading(false);
      } catch (error) {
        setError('No ha hecho ningún pedido hasta ahora.');
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
    return <div className='text-3xl font-bold'>{error}</div>;
  }

  return (
    <div>
      <HeaderInicio />
      <div className="container mx-auto p-4 grid">
        <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
        {pedidos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pedidos.map(pedido => (
              <div key={pedido._id} className="bg-white shadow-md rounded-lg p-4">
                <div className="my-2">
                  <h3 className="text-2xl font-bold mb-2">Productos</h3>
                  <ul className="space-y-2">
                    {pedido.productos.map(producto => (
                      <li key={producto.productId} className="flex items-center">
                        <div className='w-20 h-16'>
                          <Image
                            className="object-cover rounded"
                            src={producto.image}
                            alt={producto.name}
                          />
                        </div>
                        <div className='w-auto mx-4'>
                          <p className="mb-1"><span className="font-bold">Producto:</span> {producto.name}</p>
                          <p className="mb-1"><span className="font-bold">Cantidad:</span> {producto.quantity}</p>
                          <p className="mb-1"><span className="font-bold">Precio:</span> ${producto.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mb-1"><span className="font-bold">Total:</span> ${pedido.total}</p>
                <p className="mb-1"><span className="font-bold">Estado:</span> {pedido.estado}</p>
                <p className="mb-1"><span className="font-bold">Dirección:</span> {pedido.direccion}</p>
                <p className="mb-1"><span className="font-bold">Punto de Retiro:</span> {pedido.puntoDeRetiro}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes pedidos aún.</p>
        )}
      </div>
      <FooterInicio />
    </div>
  );
}

export default Pedido;
