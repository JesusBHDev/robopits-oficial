import React, { useState, useEffect } from 'react';
import { FooterInicio, HeaderInicio } from '../components/componentes-inicio';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerPerfil, actualizarPerfil } from '../api/auth.js'; // Importa las funciones

const Perfil = () => {
    const { user } = useAuth();
    const [perfil, setPerfil] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await obtenerPerfil(user.id);
                setPerfil({
                    nombre: response.data.nombre || '',
                    email: response.data.email || '',
                    telefono: response.data.telefono || ''
                });
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los datos del perfil');
                setLoading(false);
            }
        };

        if (user) {
            fetchPerfil();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarPerfil(user.id, perfil);
            alert('Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Hubo un error al actualizar el perfil');
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
            <HeaderInicio />
            <div className="w-3/5 mx-auto p-4 grid">
                <h1 className="text-2xl font-bold mb-4">Mi Cuenta</h1>
                <div className="bg-white text-black rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={perfil.nombre}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={perfil.email}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={perfil.telefono}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterInicio />
        </div>
    );
};

export default Perfil;
