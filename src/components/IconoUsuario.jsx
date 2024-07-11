import { useAuth } from '../context/AuthContext.jsx';
import { Icon } from "@iconify/react";

//Libreria ANT
import { Dropdown, Space } from 'antd';
import { BotonPersonalizable } from './componentes-inicio.jsx';


export const IconoUsuarioG = () => {
    const { user, logout } = useAuth();

    const items = [
        {
            key: '1',
            label: (
                <div className='md:flex block text-base font-bold text-blue-500'>
                    Bienvenido, {user.Nombre}! 
                </div>
            ),
        },
        {
            key: '2',
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
                <BotonPersonalizable estilos={"w-auto h-auto"} url={"/login"} titulo={"Iniciar sesión"} estiloTexto={"text-white Login w-28 h-9 grid place-items-center"} />
            ),
        },
        {
            key: '2',
            label: (
                <BotonPersonalizable estilos={"w-auto h-auto"} url={"/registro"} titulo={"Registro"} estiloTexto={"text-white Registro w-28 h-9 grid place-items-center"} />
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
