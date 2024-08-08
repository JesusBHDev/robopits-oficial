import { EncabezadoAdmin } from './ComponenetesAdmin/Encabezado';
import { getAllEmployees, deleteEmployee, updateEmpleado } from '../api/auth.js';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext.jsx";

function AdminEmpleado() {
  const { register, handleSubmit, setValue } = useForm();
  const { signupEmpleado } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getAllEmployees();
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const onSubmit = handleSubmit(async values => {
    if (editMode) {
      await updateEmpleado(selectedEmployee._id, values);
      setEditMode(false);
    } else {
      await signupEmpleado(values);
    }
    const response = await getAllEmployees();
    setEmployees(response.data);
    setShowForm(false);
    setSelectedEmployee(null);
  });

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEditMode(true);
    setShowForm(true);
    setValue("Nombre", employee.Nombre);
    setValue("Email", employee.Email);
    setValue("Password", "");
  };

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
    const response = await getAllEmployees();
    setEmployees(response.data);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <EncabezadoAdmin />
      <div className="pt-20 px-6 bg-gray-200 min-h-screen">

        <div >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-black text-3xl">Empleados</h1>
            <button
              onClick={() => { setShowForm(true); setEditMode(false); }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Agregar Empleado
            </button>
          </div>

          {showForm && (
            <div className="bg-white max-w-md p-10 rounded-lg shadow-lg absolute top-24 left-1/2 transform -translate-x-1/2 z-50">
              <h2 className="text-3xl text-gray-800 font-bold text-center mb-6">Formulario de Empleados</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="Nombre" className="block text-gray-600 mb-2">Nombre</label>
                  <input
                    type="text"
                    {...register("Nombre")}
                    id="Nombre"
                    className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Email" className="block text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    {...register("Email")}
                    id="Email"
                    className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Password" className="block text-gray-600 mb-2">Contraseña</label>
                  <input
                    type="password"
                    {...register("Password")}
                    id="Password"
                    className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {editMode ? 'Guardar Cambios' : 'Registrarse'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditMode(false); setSelectedEmployee(null); }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {employees.map(employee => (
              <div key={employee._id} className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold">{employee.Nombre}</h2>
                <p>{employee.Email}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Ver Empleado
                  </button>

                </div>
              </div>
            ))}
          </div>

          {selectedEmployee && !editMode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-bold mb-4">{selectedEmployee.Nombre}</h2>
                <p><strong>Email:</strong> {selectedEmployee.Email}</p>
                <p><strong>ID:</strong> {selectedEmployee._id}</p>
                <p><strong>Fecha de creación:</strong> {new Date(selectedEmployee.createdAt).toLocaleDateString()}</p>
                <p><strong>Última actualización:</strong> {new Date(selectedEmployee.updatedAt).toLocaleDateString()}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => handleEditEmployee(selectedEmployee)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(selectedEmployee._id)}
                    className="bg-red-700 text-white px-4 py-2 rounded-md mt-4 ml-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEmpleado;
