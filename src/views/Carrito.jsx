import React, { useState, useEffect } from 'react';
import { obtenerCarrito, agregarPedido } from '../api/auth.js'; // Asegúrate de que las rutas sean correctas
import { useAuth } from '../context/AuthContext.jsx';

const Carrito = () => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        setLoading(true);
        const response = await obtenerCarrito(user.id);
        setCarrito(response.data.carrito);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener el carrito');
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchCarrito();
    }
  }, [user]);

  const handleRealizarPedido = async () => {
    try {
      const response = await agregarPedido(user.id, direccion, 0); // Puedes ajustar el descuento según sea necesario
      console.log(response.data);
      alert('Pedido realizado exitosamente');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Hubo un error al realizar el pedido');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito ? (
        <div>
          <ul>
            {carrito.items.map(item => (
              <li key={item.productId._id}>
                <img src={item.image} alt={item.productId.NameProducto} />
                <p>Producto: {item.productId.NameProducto}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
              </li>
            ))}
          </ul>
          <p>El total de tu carrito es: ${carrito.totalPrice}</p> {/* Mostrar el total del carrito aquí */}
          
          <div>
            <h3>Dirección de Envío</h3>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingresa tu dirección"
            />
          </div>

          <button onClick={handleRealizarPedido}>Realizar Pedido</button>
        </div>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </div>
  );
};

export default Carrito;
