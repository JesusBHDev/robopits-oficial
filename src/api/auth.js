import axios from './axios.js'

export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const verificarToken = async (token) => {
    return await axios.get('/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };
export const forgotPasswordRequest = email => axios.post(`/forgorPassword`, { Email: email });
export const resetPasswordRequest = (token, Password) => axios.post(`/passwordReset`, { token, Password });
//_____________APIS REALES DEL PROYECTO XD________//
export const crearEmpleado = user => axios.post(`/registro`, user);
export const IniciarEmpleado = user => axios.post(`/inicio`, user);
export const verificarTokenEmpleado = () => axios.get('/verificar')

export const crearCategoria = Categoria => axios.post(`/Categorias`, Categoria);
export const getAllCategorias = categoria => axios.get(`/Categorias`, categoria);
export const getCategoria = categoriaId => axios.get(`/Categoria/${categoriaId}`);
export const eliminarCategoria = categoriaId => axios.delete(`/Categoria/${categoriaId}`);
export const updateCategoria = (categoriaId, categoriaData) => axios.put(`/Categoria/${categoriaId}`, categoriaData);

export const crearProducto = Producto => axios.post(`/Productos`, Producto);
export const getAllProductos = Productos => axios.get(`/Productos`, Productos);
export const getProducto = ProductoId => axios.get(`/Producto/${ProductoId}`);
export const EliminarProducto = (ProductoId) => {return axios.delete(`/Producto/${ProductoId}`);};
export const updateProducto = (ProductoId, productoData) => axios.put(`/Producto/${ProductoId}`, productoData);

export const agregarAlCarrito = (userId, productId, quantity) => axios.post('/carritoagregar', { userId, productId, quantity });
export const obtenerCarrito = (userId) =>  axios.get(`/carrito/${userId}`);

export const agregarPedido = (userId, direccion, descuento) => axios.post('/crearpedido', { userId, direccion, descuento });

// Ruta para obtener los pedidos del cliente
export const obtenerPedidosCliente = (userId) => axios.get(`/pedidosCliente/${userId}`);

// Ruta para obtener todos los pedidos (administrador)
export const obtenerTodosLosPedidos = () => axios.get('/todosLosPedidos');