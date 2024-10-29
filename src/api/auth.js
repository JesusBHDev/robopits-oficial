import axios from './axios.js';

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verificarToken = async (token) => {
  return await axios.get('/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const forgotPasswordRequest = (email) =>
  axios.post(`/forgorPassword`, { Email: email });
export const resetPasswordRequest = (token, Password) =>
  axios.post(`/passwordReset`, { token, Password });

export const crearEmpleado = (user) => axios.post(`/registro`, user);
export const IniciarEmpleado = (user) => axios.post(`/inicio`, user);
export const verificarTokenEmpleado = async (admin) => {
  return await axios.get('/verificar', {
    headers: {
      Authorization: `Bearer ${admin}`,
    },
  });
};
export const getAllEmployees = () => axios.get(`/empleados`);
export const deleteEmployee = (id) => axios.delete(`/empleados/${id}`);
export const updateEmpleado = (id, updatedData) =>
  axios.put(`/empleados/${id}`, updatedData);

export const crearCategoria = (Categoria) =>
  axios.post(`/Categorias`, Categoria);
export const getAllCategorias = (categoria) =>
  axios.get(`/Categorias`, categoria);
export const getCategoria = (categoriaId) =>
  axios.get(`/Categoria/${categoriaId}`);
export const eliminarCategoria = (categoriaId) =>
  axios.delete(`/Categoria/${categoriaId}`);
export const updateCategoria = (categoriaId, categoriaData) =>
  axios.put(`/Categoria/${categoriaId}`, categoriaData);

export const crearProducto = (Producto) => axios.post(`/Productos`, Producto);
export const getAllProductos = (Productos) =>
  axios.get(`/Productos`, Productos);
export const obtenerProductosPorCategoria = (categoriaId) => {
  return axios.get(`/Productos/categoria/${categoriaId}`);
};
export const getProducto = (ProductoId) => axios.get(`/Producto/${ProductoId}`);
export const EliminarProducto = (ProductoId) => {
  return axios.delete(`/Producto/${ProductoId}`);
};
export const updateProducto = (ProductoId, productoData) =>
  axios.put(`/Producto/${ProductoId}`, productoData);

export const agregarAlCarrito = (userId, productId, quantity) =>
  axios.post('/carritoagregar', { userId, productId, quantity });
export const obtenerCarrito = (userId) => axios.get(`/carrito/${userId}`);
export const decrementarCantidadProducto = (userId, productId) =>
  axios.post('/carrito/decrement', { userId, productId });
export const eliminarProductoDelCarrito = (userId, productId) =>
  axios.post('/carrito/remove', { userId, productId });
export const incrementarCantidadProducto = (userId, productId) =>
  axios.post('/carrito/increment', { userId, productId });

export const agregarPedido = (userId, direccion, descuento) =>
  axios.post('/crearpedido', { userId, direccion, descuento });
export const obtenerPedidosCliente = (userId) =>
  axios.get(`/pedidosCliente/${userId}`);

export const obtenerRecomendaciones = () => axios.get('/recomendaciones');

export const obtenerPerfil = (userId) => {
  return axios.get(`/perfil/${userId}`);
};
export const actualizarPerfil = (userId, perfil) => {
  return axios.put(`/perfil/${userId}`, perfil);
};
export const actualizarTelefonoUsuario = (userId, telefono) => {
  return axios.put(`/actualizar-telefono/${userId}`, { telefono });
};

export const obtenerTodosLosPedidos = () => axios.get('/todosLosPedidos');
export const actualizarPedido = (id, updatedData) =>
  axios.put(`/actualizarPedido/${id}`, updatedData);
export const eliminarPedido = (id) => axios.delete(`/eliminarPedido/${id}`);
export const obtenerPedidosPorEstado = (estado) =>
  axios.get(`/pedidos/estado/${estado}`);

export const moverPedidoAlHistorial = (pedidoId) =>
  axios.put(`/mover-pedido/${pedidoId}`);
export const obtenerHistorialDePedidos = () => axios.get('/historial-pedidos');
