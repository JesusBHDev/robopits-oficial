import React, { useState, useEffect } from 'react';
import { obtenerTodosLosPedidos } from '../api/auth.js';
import { EncabezadoAdmin, BotonMenu } from './ComponenetesAdmin/Encabezado'

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await obtenerTodosLosPedidos();
        setPedidos(response.data.pedidos);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los pedidos');
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <EncabezadoAdmin />
      <div>
        <div>
          <h1>Todos los Pedidos</h1>
          {pedidos.length > 0 ? (
            <ul>
              {pedidos.map(pedido => (
                <li key={pedido._id}>
                  <p>Pedido ID: {pedido._id}</p>
                  <p>Cliente: {pedido.cliente.nombre}</p>
                  <p>Total: ${pedido.total}</p>
                  <p>Estado: {pedido.estado}</p>
                  <p>Dirección: {pedido.direccion}</p>
                  <p>Punto de Retiro: {pedido.puntoDeRetiro}</p>
                  <ul>
                    {pedido.productos.map(producto => (
                      <li key={producto.productId}>
                        <img src={producto.image} alt={producto.name} />
                        <p>Producto: {producto.NameProducto}</p>
                        <p>Cantidad: {producto.quantity}</p>
                        <p>Precio: ${producto.price}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay pedidos aún.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPedidos