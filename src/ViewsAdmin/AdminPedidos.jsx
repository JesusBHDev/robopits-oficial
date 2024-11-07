import React, { useState, useEffect } from 'react';
import {
  obtenerTodosLosPedidos,
  actualizarPedido,
  eliminarPedido,
  obtenerPedidosPorEstado,
  moverPedidoAlHistorial,
} from '../api/auth.js';
import moment from 'moment';
import swal from 'sweetalert';
import { EncabezadoAdmin } from './ComponenetesAdmin/Encabezado';
function OrderComponent() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    descuento: '',
    puntoDeRetiro: '',
    estado: '',
  });
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Pendiente');
  const [pedidos, setPedidos] = useState([]);
  const estados = ['Pendiente', 'En preparacion', 'Listo', 'Cancelado'];
  const [setTodosLosPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obtenerPedidosPorEstado(estadoSeleccionado);
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, [estadoSeleccionado]);

  const handleEstadoChange = (event) => {
    setEstadoSeleccionado(event.target.value);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditMode(true);
    setFormData({
      descuento: order.descuento,
      puntoDeRetiro: order.puntoDeRetiro,
      estado: order.estado,
    });
  };

  // Tu función handleDeleteOrder actualizada
  const handleDeleteOrder = async (id) => {
    try {
      await eliminarPedido(id);
      const response = await obtenerTodosLosPedidos();
      setTodosLosPedidos(response.data);
      setSelectedOrder(null);

      // Mostrar alerta de éxito
      swal('Éxito', 'Pedido eliminado exitosamente', 'success');
    } catch (error) {
      console.error('Error al eliminar el pedido', error);

      // Mostrar alerta de error
      swal('Éxito', 'Pedido eliminado exitosamente', 'success');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actualizarPedido(selectedOrder._id, formData);
      const response = await obtenerTodosLosPedidos();
      setTodosLosPedidos(response.data);
      setEditMode(false);
      setSelectedOrder(null);

      // Mostrar alerta de éxito
      swal('Éxito', 'Pedido actualizado exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el pedido', error);

      // Mostrar alerta de error
      swal('Éxito', 'Pedido actualizado exitosamente', 'success');
    }
  };

  const handleMoverPedido = async (pedidoId) => {
    try {
      await moverPedidoAlHistorial(pedidoId);
      // Actualizar la lista de pedidos después de mover al historial
      const resultado = await obtenerTodosLosPedidos();
      setPedidos(resultado.data);
    } catch (error) {
      console.error('Error al mover el pedido al historial', error);
      swal('Fallo', 'Error al mover el pedido al historial', 'error');
    }
  };

  return (
    <div>
      <EncabezadoAdmin />
      <div className="pt-20 px-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Todos los Pedidos</h1>
        <div className="mb-4">
          <label htmlFor="estado" className="mr-2">
            Filtrar por estado:
          </label>
          <select
            id="estado"
            value={estadoSeleccionado}
            onChange={handleEstadoChange}
            className="p-2 border rounded"
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        <div>
          {pedidos.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pedidos.map((pedido) => (
                <li
                  key={pedido._id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <p>
                    <strong>Cliente:</strong> {pedido.cliente.nombre}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                  <p>
                    <strong>Punto de Retiro:</strong> {pedido.puntoDeRetiro}
                  </p>
                  <p>
                    <strong>Fecha del pedido:</strong>{' '}
                    {moment(pedido.createdAt).format('DD/MM/YYYY HH:mm')}
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => setSelectedOrder(pedido)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Ver Pedido
                    </button>
                    {pedido.estado === 'Listo' && (
                      <button
                        onClick={() => handleMoverPedido(pedido._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay pedidos en este estado.</p>
          )}
        </div>

        {selectedOrder && !editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md w-auto max-w-3xl h-auto max-h-screen overflow-y-auto shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Pedido Detalles</h2>
              <div className="space-y-2">
                <p>
                  <strong>Pedido ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>Fecha del pedido:</strong>{' '}
                  {moment(selectedOrder.createdAt).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <strong>Cliente:</strong> {selectedOrder.cliente.nombre}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.total}
                </p>
                <p>
                  <strong>Total de productos:</strong>{' '}
                  {selectedOrder.totalproductos}{' '}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedOrder.estado}
                </p>
                <p>
                  <strong>Dirección:</strong> {selectedOrder.direccion}
                </p>
                <p>
                  <strong>Punto de Retiro:</strong>{' '}
                  {selectedOrder.puntoDeRetiro}
                </p>
              </div>
              <ul className="mt-4 space-y-4">
                {selectedOrder.productos.map((producto) => (
                  <li
                    key={producto.productId}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={producto.image}
                      alt={producto.name}
                      className="w-16 h-16 rounded-md shadow-sm"
                    />
                    <div>
                      <p>
                        <strong>Producto:</strong> {producto.name}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {producto.quantity}
                      </p>
                      <p>
                        <strong>Precio:</strong> ${producto.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => handleEditOrder(selectedOrder)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-yellow-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteOrder(selectedOrder._id)}
                  className="bg-red-700 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-800 transition duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedOrder && editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md w-auto max-w-2xl overflow-y-auto max-h-full">
              <h2 className="text-2xl font-bold mb-4">Editar Pedido</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Descuento</label>
                  <input
                    type="number"
                    value={formData.descuento}
                    onChange={(e) =>
                      setFormData({ ...formData, descuento: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Punto de Retiro</label>
                  <select
                    value={formData.puntoDeRetiro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        puntoDeRetiro: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Seleccionar punto de retiro</option>
                    <option value="Parque Poblamiento">
                      Parque Poblamiento
                    </option>
                    <option value="Centro de huejutla">
                      Centro de huejutla
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) =>
                      setFormData({ ...formData, estado: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En preparacion">En preparacion</option>
                    <option value="Listo">Listo</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setSelectedOrder(null);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderComponent;
