import { useAuth } from '../context/AuthContext.jsx';
import { Icon } from "@iconify/react";
import '../css/componentes-inicio.css'

// Libreria ANT
import { Dropdown, Space } from 'antd';
import { NavLink } from 'react-router-dom';

export const IconoUsuarioG = () => {
    const { user, logout } = useAuth();

    const items = [
        {
            key: '1',
            label: (
                <NavLink to="/perfil">
                    <div className='md:flex block text-base font-bold text-black-500'>
                        Perfil, {user?.Nombre || 'Usuario'}
                    </div>
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <NavLink to="/Pedidos">
                    <div className='md:flex block text-base font-bold text-black-500'>
                        Mis Pedidos
                    </div>
                </NavLink>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={logout} className='text-base font-bold text-red-500'>Cerrar Sesión</button>
            ),
        },
    ];

    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Icon icon="mdi:account-circle" className='text-black size-8 mr-8 ml-4' />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export const IconoUsuarioC = () => {

    const items = [
        {
            key: '1',
            label: (
                <NavLink to="/login">
                        <div className="text-white bg-[#3BA4F6] hover:bg-[#2587eb] p-2 rounded font-bold text-center">
                            Iniciar sesión
                        </div>
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <NavLink to="/registro">
                        <div className="text-white bg-[#4db4b2] hover:bg-[#329696] p-2 rounded font-bold text-center">
                            Registro
                        </div>
                </NavLink>
            ),
        },
    ];

    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                className='w-auto h-auto'
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Icon icon="mdi:account-circle" className='text-black size-8 mx-8' />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}
