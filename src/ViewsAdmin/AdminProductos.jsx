import React, { useEffect, useState } from 'react';
import { getAllProductos, crearProducto, updateProducto, EliminarProducto, getProducto, getAllCategorias } from '../api/auth';
import { EncabezadoAdmin } from './ComponenetesAdmin/Encabezado'
import swal from 'sweetalert';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    IdProducto: '',
    NameProducto: '',
    Categoria: '',
    Precio: '',
    Existencias: '',
    Descripcion: '',
    Caracteristicas: '',
    Incluye: 'No incluye mas articulos',
    Imagen: null,
    ImagenURL: ''
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const emptyProductData = {
    IdProducto: '',
    NameProducto: '',
    Categoria: '',
    Precio: '',
    Existencias: '',
    Descripcion: '',
    Caracteristicas: '',
    Incluye: '',
    Imagen: ''
  };

  const openNewProductForm = () => {
    setNewProductData(emptyProductData);
    setEditMode(false);
    setShowNewProductForm(true);
  };

  useEffect(() => {
    getAllProductos()
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos', error);
      });
  }, []);

  useEffect(() => {
    getAllCategorias()
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setNewProductData({
        ...selectedProduct,
        ImagenURL: selectedProduct.Imagen // Establecer el enlace de la imagen en el nuevo estado
      });
    }
  }, [selectedProduct]);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setEditMode(false);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // handleFileChange actualizado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
      if (!validImageTypes.includes(fileType)) {
        alert('Por favor seleccione un archivo de imagen válido (gif, jpeg, png, webp)');
        e.target.value = ''; // Limpiar el input de archivo
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductData(prevData => ({
          ...prevData,
          Imagen: file,
          ImagenURL: reader.result // Establecer la URL de la imagen en el nuevo estado
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('IdProducto', newProductData.IdProducto);
    formData.append('NameProducto', newProductData.NameProducto);
    formData.append('Categoria', newProductData.Categoria);
    formData.append('Precio', newProductData.Precio);
    formData.append('Existencias', newProductData.Existencias);
    formData.append('Descripcion', newProductData.Descripcion);
    formData.append('Caracteristicas', newProductData.Caracteristicas);
    formData.append('Incluye', newProductData.Incluye);
    formData.append('Imagen', newProductData.Imagen);

    try {
      if (editMode && selectedProduct) {
        const updatedProduct = await updateProducto(selectedProduct._id, formData);
        console.log('Producto actualizado exitosamente:', updatedProduct);
        swal("Éxito", "Producto Editado exitosamente", "success");
        const updatedProducts = productos.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProductos(updatedProducts);
        setEditMode(false);
      } else {
        const createdProduct = await crearProducto(formData);
        console.log('Producto creado exitosamente:', createdProduct);

        // Actualiza el estado de productos
        setProductos(prevProductos => [...prevProductos, createdProduct.data]);

        setShowNewProductForm(false);
        swal("Éxito", "Producto creado", "success");
      }

      setNewProductData(emptyProductData);
    } catch (error) {
      console.error('Error al guardar cambios', error);
      swal("Fallo", "Error al guardar los cambios ", "error");
    }
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm(prevState => !prevState);
  };

  const openEditProductForm = () => {
    setEditMode(true);
    setNewProductData({
      ...selectedProduct,
      Imagen: selectedProduct.Imagen // Conservar el enlace de la imagen actual
    });
  };

  const handleRefresh = async () => {
    try {
      const response = await getProducto(selectedProduct._id);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error al refrescar el producto', error);
      swal("Fallo", "Error al refrescar el producto ", "error");
    }
  };

  const handleDeleteProduct = (productId) => {
    EliminarProducto(productId)
      .then(() => {
        setProductos(prevProductos => prevProductos.filter(producto => producto._id !== productId));
        closeProductDetails();
        swal("Éxito", "Producto eliminado exitosamente", "success");
      })
      .catch(error => {
        console.error('Error al eliminar el producto', error);
        swal("Fallo", "Producto no se pudo eliminar ", "error");
      });
  };
  // Filtrar productos por el término de búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.NameProducto && producto.NameProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <EncabezadoAdmin />

      <div className="pt-20 px-6">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <h1 className="text-3xl font-semibold">Productos</h1>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md p-2 w-full md:w-1/3 mb-4 md:mb-0"
          />
          <button
            onClick={toggleNewProductForm}
            className="bg-blue-500 text-white px-4 py-2 mt-2 sm:mt-0 rounded-md transition duration-300 ease-in-out transform hover:bg-blue-600 hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {showNewProductForm ? 'Cancelar' : 'Agregar Nuevo Producto'}
          </button>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProductos.map(producto => (
            <div key={producto.IdProducto} className="w-full bg-white rounded-md p-4 shadow-md flex flex-col items-center">
              <img src={producto.Imagen} alt={producto.NameProducto} className="w-full h-32 object-cover mb-4" />
              <h2 className="text-lg font-semibold mb-2 text-center">{producto.NameProducto}</h2>
              <p className="text-sm text-gray-600 mb-2">Categoría: {producto.Categoria}</p>
              <p className="text-sm text-gray-600 mb-2">ID: {producto.IdProducto}</p>
              <button
                onClick={() => openProductDetails(producto)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Ver Producto
              </button>
            </div>
          ))}
        </div>
      </div>

      {showNewProductForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow w-11/12 h-5/6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{editMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

              <div className="col-span-2">
                <label htmlFor="NameProducto" className="block text-gray-700 mb-2">Nombre del Producto:</label>
                <input type="text" name="NameProducto" value={newProductData.NameProducto} onChange={handleInputChange} placeholder="Nombre del producto" className="border border-gray-400 rounded-md p-2 w-full" required />
              </div>

              <div className="col-span-2">
                <label htmlFor="Categoria" className="block text-gray-700 mb-2">Categoría:</label>
                <select name="Categoria" value={newProductData.Categoria} onChange={handleInputChange} className="border border-gray-400 rounded-md p-2 w-full" required>
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria._id} value={categoria.NameCategoria}>{categoria.NameCategoria}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="Precio" className="block text-gray-700 mb-2">Precio:</label>
                <input type="number" name="Precio" value={newProductData.Precio} onChange={handleInputChange} placeholder="Precio" className="border border-gray-400 rounded-md p-2 w-full" required />
              </div>

              <div>
                <label htmlFor="Existencias" className="block text-gray-700 mb-2">Existencias:</label>
                <input type="number" name="Existencias" value={newProductData.Existencias} onChange={handleInputChange} placeholder="Existencias" className="border border-gray-400 rounded-md p-2 w-full" required />
              </div>

              <div className="col-span-2">
                <label htmlFor="Descripcion" className="block text-gray-700 mb-2">Descripción:</label>
                <textarea name="Descripcion" value={newProductData.Descripcion} onChange={handleInputChange} placeholder="Descripción" className="border border-gray-400 rounded-md p-2 w-full" required></textarea>
              </div>

              <div className="col-span-2">
                <label htmlFor="Caracteristicas" className="block text-gray-700 mb-2">Características:</label>
                <textarea name="Caracteristicas" value={newProductData.Caracteristicas} onChange={handleInputChange} placeholder="Características" className="border border-gray-400 rounded-md p-2 w-full" required></textarea>
              </div>

              <div className="col-span-2">
                <label htmlFor="Incluye" className="block text-gray-700 mb-2">Incluye:</label>
                <textarea name="Incluye" value={newProductData.Incluye} onChange={handleInputChange} placeholder="Incluye" className="border border-gray-400 rounded-md p-2 w-full" required></textarea>
              </div>

              <div className="col-span-2">
                <label htmlFor="Imagen" className="block text-gray-700 mb-2">Imagen del Producto:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-400 rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-end col-span-2">
                <button type="button" onClick={toggleNewProductForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2">Cancelar</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{editMode ? 'Guardar cambios' : 'Agregar Producto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow w-11/12 h-5/6 overflow-y-auto">
            {editMode ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="IdProducto" className="block text-gray-700 mb-2">ID del Producto:</label>
                  <input type="text" name="IdProducto" value={newProductData.IdProducto} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required />
                </div>

                <div className="col-span-2">
                  <label htmlFor="NameProducto" className="block text-gray-700 mb-2">Nombre del Producto:</label>
                  <input type="text" name="NameProducto" value={newProductData.NameProducto} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required />
                </div>

                <div className="col-span-2">
                  <label htmlFor="Categoria" className="block text-gray-700 mb-2">Categoría:</label>
                  <select name="Categoria" value={newProductData.Categoria} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria._id} value={categoria.NameCategoria}>{categoria.NameCategoria}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="Precio" className="block text-gray-700 mb-2">Precio:</label>
                  <input type="number" name="Precio" value={newProductData.Precio} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required />
                </div>

                <div>
                  <label htmlFor="Existencias" className="block text-gray-700 mb-2">Existencias:</label>
                  <input type="number" name="Existencias" value={newProductData.Existencias} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required />
                </div>

                <div className="col-span-2">
                  <label htmlFor="Descripcion" className="block text-gray-700 mb-2">Descripción:</label>
                  <textarea name="Descripcion" value={newProductData.Descripcion} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required></textarea>
                </div>

                <div className="col-span-2">
                  <label htmlFor="Caracteristicas" className="block text-gray-700 mb-2">Características:</label>
                  <textarea name="Caracteristicas" value={newProductData.Caracteristicas} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required></textarea>
                </div>

                <div className="col-span-2">
                  <label htmlFor="Incluye" className="block text-gray-700 mb-2">Incluye:</label>
                  <textarea name="Incluye" value={newProductData.Incluye} onChange={handleInputChange} className="border border-gray-300 rounded-md p-3 w-full" required></textarea>
                </div>

                <div className="col-span-2">
                  <label htmlFor="Imagen" className="block text-gray-700 mb-2">Imagen del Producto:</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="border border-gray-300 rounded-md p-3 w-full" />
                  {!newProductData.Imagen && (
                    <img src={selectedProduct.Imagen} alt={selectedProduct.NameProducto} className="w-40 h-40 object-cover mt-4" />
                  )}
                </div>

                <div className="flex justify-end col-span-2">
                  <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-3">Cancelar</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar cambios</button>
                </div>
              </form>
            ) : (
              <div >
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedProduct.Imagen}
                    alt={selectedProduct.NameProducto}
                    className="w-60 h-60 object-cover mb-4"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">{selectedProduct.NameProducto}</h2>
                <div className="space-y-2 text-gray-700">
                  <p><strong>ID:</strong> {selectedProduct.IdProducto}</p>
                  <p><strong>Categoría:</strong> {selectedProduct.Categoria}</p>
                  <p><strong>Precio:</strong> ${selectedProduct.Precio}</p>
                  <p><strong>Existencias:</strong> {selectedProduct.Existencias}</p>
                  <p><strong>Descripción:</strong> {selectedProduct.Descripcion}</p>
                  <p><strong>Características:</strong> {selectedProduct.Caracteristicas}</p>
                  <p><strong>Incluye:</strong> {selectedProduct.Incluye}</p>
                </div>
                <div className="mt-6 flex justify-between">
                  <button onClick={openEditProductForm} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Editar</button>
                  <button onClick={closeProductDetails} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cerrar</button>
                  <button onClick={handleRefresh} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Refrescar</button>
                  <button onClick={() => handleDeleteProduct(selectedProduct._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Eliminar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;
