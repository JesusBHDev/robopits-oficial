import React, { useEffect, useState } from 'react';
import { getAllProductos, crearProducto, updateProducto, EliminarProducto, getProducto, getAllCategorias } from '../api/auth';
import { EncabezadoAdmin, BotonMenu } from './ComponenetesAdmin/Encabezado'
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
    Incluye: '',
    Imagen: null,
    ImagenURL: ''
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    if (selectedProduct) {
      setNewProductData({
        ...selectedProduct,
        ImagenURL: selectedProduct.Imagen // Establecer el enlace de la imagen en el nuevo estado
      });
    }
  }, [selectedProduct]);

  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    getAllCategorias()
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías', error);
      });
  }, []);
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


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Leer el archivo como URL
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
        const updatedProduct = await updateProducto(selectedProduct._id, formData); // Corregido el uso de updateProducto
        console.log('Producto actualizado exitosamente:', updatedProduct);
        const updatedProducts = productos.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProductos(updatedProducts);
        setEditMode(false);
        getAllProductos()
          .then(response => {
            setProductos(response.data);
          })
          .catch(error => {
            console.error('Error al obtener productos', error);
          });
      } else {
        const createdProduct = await crearProducto(formData);
        console.log('Producto creado exitosamente:', createdProduct);
        getAllProductos()
          .then(response => {
            setProductos(response.data);
          })
          .catch(error => {
            console.error('Error al obtener productos', error);
          });
        setNewProductData({
          IdProducto: '',
          NameProducto: '',
          Categoria: '',
          Precio: '',
          Existencias: '',
          Descripcion: '',
          Caracteristicas: '',
          Incluye: '',
          Imagen: null
        });
        setShowNewProductForm(false);
      }
    } catch (error) {
      console.error('Error al guardar cambios', error);
    }
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm(prevState => !prevState);
  };

  const closeNewProductForm = () => {
    setShowNewProductForm(false);
  };

  const openEditProductForm = () => {
    setEditMode(true);
    // Establecer los datos del producto seleccionado
    setNewProductData({
      ...selectedProduct,
      Imagen: selectedProduct.Imagen // Conservar el enlace de la imagen actual
    });
  };
  const handleRefresh = async () => {
    try {
      const response = await getProducto(selectedProduct._id);
      const updatedProduct = response.data;
      setSelectedProduct(updatedProduct);
    } catch (error) {
      console.error('Error al refrescar el producto', error);
    }
  };

  const handleDeleteProduct = (productId) => {
    EliminarProducto(productId)
      .then(response => {
        // Filtrar los productos para eliminar el que coincida con el productId
        setProductos(prevProductos => prevProductos.filter(producto => producto._id !== productId));
        console.log('Producto eliminado correctamente');
        // Opcional: cerrar los detalles del producto después de eliminarlo
        closeProductDetails();
      })
      .catch(error => {
        console.error('Error al eliminar el producto', error);
      });
  };


  return (
    <div>
        <EncabezadoAdmin/>
      <div className="w-full bg-emerald-700 h-auto p-8">

        <h1 className="text-3xl font-semibold mb-4">Productos</h1>
        {/* Button to show/hide new product form */}
        <div className="mt-4">
          <button onClick={toggleNewProductForm} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {showNewProductForm ? 'Cancelar' : 'Agregar Nuevo Producto'}
          </button>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Show existing products */}
          {productos.map(producto => (
            <div key={producto.IdProducto} className="w-full bg-white rounded-md p-4 mb-4">
              <div className="flex flex-col items-center ">
                <img src={producto.Imagen} alt={producto.NameProducto} className="w-full h-32 object-cover mb-4" />
                <h2 className="text-lg font-semibold mb-2">{producto.NameProducto}</h2>
                <p className="text-sm text-gray-600 mb-2">Categoría: {producto.Categoria}</p>
                <p className="text-sm text-gray-600 mb-2">ID: {producto.IdProducto}</p>
                <div className="flex justify-center space-x-4">
                  <button onClick={() => openProductDetails(producto)} className="bg-green-500 text-white px-3 py-1 rounded-md">Ver Producto</button>
                </div>
              </div>
            </div>))}
        </div>

        {/* New product form */}
        {showNewProductForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow w-11/12 overflow-y-auto h-auto">
              <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input type="text" name="IdProducto" value={newProductData.IdProducto} onChange={handleInputChange} placeholder="Id del producto" className="border border-gray-400 rounded-md p-2" required />
                <input type="text" name="NameProducto" value={newProductData.NameProducto} onChange={handleInputChange} placeholder="Nombre del producto" className="border border-gray-400 rounded-md p-2" required />
                <div>
                  <label className="block mb-2 h-2">Categoría:</label>
                  <select
                    name="Categoria"
                    value={newProductData.Categoria}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded-md p-2"
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria._id} value={categoria.NameCategoria}>{categoria.NameCategoria}</option>
                    ))}
                  </select>
                </div>
                <input type="number" name="Precio" value={newProductData.Precio} onChange={handleInputChange} placeholder="Precio" className="border border-gray-400 rounded-md p-2" required />
                <input type="number" name="Existencias" value={newProductData.Existencias} onChange={handleInputChange} placeholder="Existencias" className="border border-gray-400 rounded-md p-2" required />
                <textarea name="Descripcion" value={newProductData.Descripcion} onChange={handleInputChange} placeholder="Descripción" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                <textarea name="Caracteristicas" value={newProductData.Caracteristicas} onChange={handleInputChange} placeholder="Características" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                <textarea name="Incluye" value={newProductData.Incluye} onChange={handleInputChange} placeholder="Incluye" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                <input type="file" accept="image/*" onChange={handleFileChange} className="border border-gray-400 rounded-md p-2 col-span-2" required />
                <div className="flex justify-end col-span-2">
                  <button type="button" onClick={closeNewProductForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2">Cancelar</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar Producto</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Details of the selected product */}
        {selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow w-11/12 overflow-y-auto h-auto">
              {editMode ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <input type="text" name="IdProducto" value={newProductData.IdProducto} onChange={handleInputChange} placeholder="Id del producto" className="border border-gray-400 rounded-md p-2" required />

                  <input type="text" name="NameProducto" value={newProductData.NameProducto} onChange={handleInputChange} placeholder="Nombre del producto" className="border border-gray-400 rounded-md p-2" required />
                  <div>
                    <label className="block mb-2 h-2">Categoría:</label>
                    <select
                      name="Categoria"
                      value={newProductData.Categoria}
                      onChange={handleInputChange}
                      className="border border-gray-400 rounded-md p-2"
                      required
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map(categoria => (
                        <option key={categoria._id} value={categoria.NameCategoria}>{categoria.NameCategoria}</option>
                      ))}
                    </select>
                  </div>
                  <input type="number" name="Precio" value={newProductData.Precio} onChange={handleInputChange} placeholder="Precio" className="border border-gray-400 rounded-md p-2" required />
                  <input type="number" name="Existencias" value={newProductData.Existencias} onChange={handleInputChange} placeholder="Existencias" className="border border-gray-400 rounded-md p-2" required />
                  <textarea name="Descripcion" value={newProductData.Descripcion} onChange={handleInputChange} placeholder="Descripción" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                  <textarea name="Caracteristicas" value={newProductData.Caracteristicas} onChange={handleInputChange} placeholder="Características" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                  <textarea name="Incluye" value={newProductData.Incluye} onChange={handleInputChange} placeholder="Incluye" className="border border-gray-400 rounded-md p-2 col-span-2" required></textarea>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="border border-gray-400 rounded-md p-2 col-span-2" />

                  {/* ... */}
                  <div className="flex justify-end col-span-2">
                    <button type="button" onClick={() => setEditMode(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2">Cancelar</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar cambios</button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <img src={selectedProduct.Imagen} alt={selectedProduct.NameProducto} className="w-40 h-40 object-cover mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{selectedProduct.NameProducto}</h2>
                    <p className="text-gray-600 mb-2"><strong>ID:</strong> {selectedProduct.IdProducto}</p>
                    <p className="text-gray-600 mb-2"><strong>Categoría:</strong> {selectedProduct.Categoria}</p>
                    <p className="text-gray-600 mb-2"><strong>Precio:</strong> {selectedProduct.Precio}</p>
                    <p className="text-gray-600 mb-2"><strong>Existencias:</strong> {selectedProduct.Existencias}</p>
                    <p className="text-gray-600 mb-2"><strong>Descripción:</strong> {selectedProduct.Descripcion}</p>
                    <p className="text-gray-600 mb-2"><strong>Características:</strong> {selectedProduct.Caracteristicas}</p>
                    <p className="text-gray-600 mb-2"><strong>Incluye:</strong> {selectedProduct.Incluye}</p>
                    {/* Botones */}
                    <div className="mt-4">
                      <button onClick={openEditProductForm} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Editar</button>
                      <button onClick={closeProductDetails} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cerrar</button>
                      <button onClick={handleRefresh} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Refrescar</button>
                      {/* Botón de eliminar */}
                      <button onClick={() => handleDeleteProduct(selectedProduct._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Eliminar</button>
                    </div>
                  </div>

                </>


              )}
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default AdminProductos;