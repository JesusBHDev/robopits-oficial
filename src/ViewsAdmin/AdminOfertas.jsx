import { useEffect, useState } from 'react';
import { EncabezadoAdmin } from './ComponenetesAdmin/Encabezado';
import { todasOferta, crearOferta, eliminaOferta } from '../api/auth';

function AdminOfertas() {
  const [ofertas, setOfertas] = useState([]);
  const [nuevaOferta, setNuevaOferta] = useState({
    Descripcion: '',
    PrecioOriginal: 0,
    PrecioOferta: 0,
    FechaInicio: '',
    FechaFin: '',
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    cargarOfertas();
  }, []);

  const cargarOfertas = async () => {
    try {
      const response = await todasOferta();
      setOfertas(response.data);
    } catch (error) {
      console.error('Error al cargar las ofertas:', error);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaOferta((prevOferta) => ({
      ...prevOferta,
      [name]: value,
    }));
  };

  const manejarImagen = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const agregarOferta = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Imagen', imagenFile);
    formData.append('Descripcion', nuevaOferta.Descripcion);
    formData.append('PrecioOriginal', nuevaOferta.PrecioOriginal);
    formData.append('PrecioOferta', nuevaOferta.PrecioOferta);
    formData.append('FechaInicio', nuevaOferta.FechaInicio);
    formData.append('FechaFin', nuevaOferta.FechaFin);

    try {
      await crearOferta(formData);
      cargarOfertas();
      setNuevaOferta({
        Descripcion: '',
        PrecioOriginal: 0,
        PrecioOferta: 0,
        FechaInicio: '',
        FechaFin: '',
      });
      setImagenFile(null);
      setMostrarModal(false); // Cerrar el modal después de crear la oferta
    } catch (error) {
      console.error('Error al crear la oferta:', error);
    }
  };

  const eliminarOferta = async (ofertaId) => {
    try {
      await eliminaOferta(ofertaId);
      alert('Oferta eliminada exitosamente');
      cargarOfertas();
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
    }
  };

  return (
    <div>
      <EncabezadoAdmin />
      <div className="pt-10 px-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Lista de Ofertas
          </h2>
          {/* Botón para abrir el modal */}
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
          >
            Crear Oferta
          </button>

          {/* Lista de ofertas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {ofertas.map((oferta) => (
              <div
                key={oferta._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={oferta.Imagen}
                  alt="Imagen de oferta"
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">
                  {oferta.Descripcion}
                </h3>
                <p className="text-gray-600">
                  Precio Original: ${oferta.PrecioOriginal}
                </p>
                <p className="text-gray-600">
                  Precio Oferta: ${oferta.PrecioOferta}
                </p>
                <p className="text-gray-600">
                  Fecha Inicio:{' '}
                  {new Date(oferta.FechaInicio).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Fecha Fin: {new Date(oferta.FechaFin).toLocaleDateString()}
                </p>
                <button
                  onClick={() => eliminarOferta(oferta._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para el formulario de creación de oferta */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Crear Nueva Oferta
            </h2>

            <form onSubmit={agregarOferta}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Imagen:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarImagen}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Descripción:
                </label>
                <textarea
                  name="Descripcion"
                  value={nuevaOferta.Descripcion}
                  onChange={manejarCambio}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Precio Original:
                </label>
                <input
                  type="number"
                  name="PrecioOriginal"
                  value={nuevaOferta.PrecioOriginal}
                  onChange={manejarCambio}
                  min="0"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Precio Oferta:
                </label>
                <input
                  type="number"
                  name="PrecioOferta"
                  value={nuevaOferta.PrecioOferta}
                  onChange={manejarCambio}
                  min="0"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Fecha Inicio:
                </label>
                <input
                  type="date"
                  name="FechaInicio"
                  value={nuevaOferta.FechaInicio}
                  onChange={manejarCambio}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Fecha Fin:
                </label>
                <input
                  type="date"
                  name="FechaFin"
                  value={nuevaOferta.FechaFin}
                  onChange={manejarCambio}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Crear Oferta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOfertas;
