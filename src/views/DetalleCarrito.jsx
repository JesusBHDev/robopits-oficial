import React, { useState, useEffect } from 'react';
import { obtenerCarrito, agregarPedido, eliminarProductoDelCarrito, decrementarCantidadProducto, incrementarCantidadProducto } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Icon } from "@iconify/react";
import { Button, Modal, Input } from 'antd';

export default function DetalleCarrito() {
    const { user } = useAuth();
    const [carrito, setCarrito] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        cargarCarrito();
    }, [user]);

    const cargarCarrito = async () => {
        if (user && user.id) {
            try {
                setLoading(true);
                const response = await obtenerCarrito(user.id);
                setCarrito(response.data.carrito.items || []);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener el carrito');
                setLoading(false);
            }
        }
    };

    const handleRealizarPedido = async () => {
        try {
            const response = await agregarPedido(user.id, direccion);
            alert('Pedido realizado exitosamente');
            setCarrito([]);
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            alert('Hubo un error al realizar el pedido');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            await handleRealizarPedido();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            alert('Hubo un error al realizar el pedido');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const toggleDescription = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] })); // Cambia el estado de expandido para el ID específico
    };

    const handleIncrement = async (productId) => {
        try {
            await incrementarCantidadProducto(user.id, productId);
            cargarCarrito();  // Recargar el carrito después de modificarlo
        } catch (error) {
            console.error('Error al incrementar la cantidad del producto:', error);
        }
    };

    const handleDecrement = async (productId) => {
        try {
            await decrementarCantidadProducto(user.id, productId);
            cargarCarrito();  // Recargar el carrito después de modificarlo
        } catch (error) {
            console.error('Error al decrementar la cantidad del producto:', error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await eliminarProductoDelCarrito(user.id, productId);
            cargarCarrito();  // Recargar el carrito después de modificarlo
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const total = carrito.reduce((total, item) => total + (item.productId?.Precio || 0) * item.quantity, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
            <h1 className="text-2xl font-bold mb-8">Carrito de compras</h1>
            {carrito.length > 0 ? (
                <>
                    <h1 className='font-semibold text-gray-800 text-lg mb-4'>Artículos del carrito</h1>
                    {carrito.map((item) => (
                        <div key={item.productId?._id || item._id} className="flex justify-between items-center mb-2 h-auto">
                            <img src={item.productId?.Imagen} alt={item.productId?.NameProducto} width={70} height={70} className="rounded-md" />
                            <div className="w-2/3 mx-2 h-auto">
                                <p className='font-semibold text-gray-800'>{item.productId?.NameProducto}</p>
                                <div className="text-gray-500 text-sm">
                                    {expanded[item.productId?._id || item._id] ? item.productId?.Descripcion : `${item.productId?.Descripcion?.substring(0, 50)}...`}
                                    <button onClick={() => toggleDescription(item.productId?._id || item._id)} className="text-blue-500">
                                        {expanded[item.productId?._id || item._id] ? 'Ver menos' : 'Ver más'}
                                    </button>
                                </div>
                            </div>
                            <div className='md:flex'>
                                <span className="font-semibold mx-5">${(item.productId?.Precio * item.quantity).toFixed(2)}</span>
                                <Button className='bg-blue-700 hover:bg-blue-500' type="primary" size="small" onClick={() => handleDecrement(item.productId?._id || item._id)}>
                                    <Icon icon="mdi:minus" />
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button className='bg-blue-700 hover:bg-blue-500' type="primary" size="small" onClick={() => handleIncrement(item.productId?._id || item._id)}>
                                    <Icon icon="mdi:plus" />
                                </Button>
                                <Button className='md:ml-2 mx-auto' type="primary" danger size="small" onClick={() => handleRemove(item.productId?._id || item._id)}>
                                    <Icon icon="mdi:trash-can-outline" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="text-lg mt-8">
                        <p className='font-medium'>Total:</p>
                        <p className='text-2xl font-bold'>${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" onClick={showModal} className="mt-4 bg-blue-700 hover:bg-blue-500 text-white font-bold rounded">
                            Continuar compra
                        </Button>
                        <Modal title="Ingrese la dirección de envío" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Ingresa la dirección donde quieres recibir tu pedido"
                            />
                        </Modal>
                    </div>
                </>
            ) : (
                <p>No hay productos en el carrito</p>
            )}
        </div>
    );
}
