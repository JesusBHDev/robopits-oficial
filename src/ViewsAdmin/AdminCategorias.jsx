import React, { useEffect, useState } from 'react';
import { EncabezadoAdmin, BotonMenu } from './ComponenetesAdmin/Encabezado'
import { getAllCategorias, eliminarCategoria, updateCategoria, crearCategoria } from '../api/auth';

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    getAllCategorias()
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías', error);
      });
  }, []);

  const handleEliminarCategoria = (categoriaId) => {
    eliminarCategoria(categoriaId)
      .then(response => {
        setCategorias(prevCategorias => prevCategorias.filter(categoria => categoria._id !== categoriaId));
        console.log('Categoría eliminada correctamente');
      })
      .catch(error => {
        console.error('Error al eliminar la categoría', error);
      });
  };

  const handleEditarCategoria = (categoriaId, currentName) => {
    setEditingCategoryId(categoriaId);
    setEditedCategoryName(currentName);
  };

  const handleGuardarCambios = (categoriaId) => {
    updateCategoria(categoriaId, { NameCategoria: editedCategoryName })
      .then(response => {
        // Actualiza el estado con los cambios
        setCategorias(prevCategorias => prevCategorias.map(categoria =>
          categoria._id === categoriaId ? { ...categoria, NameCategoria: editedCategoryName } : categoria
        ));

        // Desactiva la edición y reinicia el nombre editado
        setEditingCategoryId(null);
        setEditedCategoryName('');

        console.log('Cambios guardados correctamente');
      })
      .catch(error => {
        console.error('Error al guardar los cambios', error);
      });
  };

  const handleAgregarCategoria = () => {
    setShowAddForm(true);
  };

  const handleCancelarAgregarCategoria = () => {
    setShowAddForm(false);
    setNewCategoryName('');
  };

  const handleGuardarNuevaCategoria = () => {
    crearCategoria({ NameCategoria: newCategoryName })
      .then(response => {
        // Actualiza el estado con la nueva categoría
        setCategorias(prevCategorias => [...prevCategorias, response.data]);

        // Oculta el formulario y reinicia el nombre
        setShowAddForm(false);
        setNewCategoryName('');

        console.log('Categoría creada correctamente');
      })
      .catch(error => {
        console.error('Error al crear la categoría', error);
      });
  };

  return (
    <div>
      <EncabezadoAdmin/>

      <div className="w-full bg-emerald-700 h-auto p-8">
        <h2 className="text-center text-white py-4">Categorías</h2>
        <div className="mb-4">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={handleAgregarCategoria}>Agregar Categoría</button>
        </div>

        {showAddForm && (
          <div className="bg-orange-400 flex flex-col items-center justify-center mb-4 rounded-md p-4 mx-auto w-64">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la nueva categoría"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={handleGuardarNuevaCategoria}>Guardar Categoría</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={handleCancelarAgregarCategoria}>Cancelar</button>
            </div>
          </div>

        )}

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorias.map(categoria => (
            <div key={categoria._id} className="w-full bg-white rounded-md p-4 mb-4">
              {editingCategoryId === categoria._id ? (
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded-md"
                  />
                  <div className=" justify-center space-x-4">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={() => handleGuardarCambios(categoria._id)}>Guardar cambios</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => setEditingCategoryId(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center ">
                  <h3 className="text-black text-lg font-semibold mb-2">{categoria.NameCategoria}</h3>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={() => handleEditarCategoria(categoria._id, categoria.NameCategoria)}>Editar</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleEliminarCategoria(categoria._id)}>Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default AdminCategorias;
