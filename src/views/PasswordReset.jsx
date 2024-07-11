import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPasswordRequest } from '../api/auth';
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

import "../css/PasswordReset.css"
function PasswordReset() {
    const navigate = useNavigate();
    const location = useLocation();
    const [Password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        try {
            // Obtener el token de la ubicación
            const token = new URLSearchParams(location.search).get('token');

            // Validar que las contraseñas coincidan


            // Realizar la solicitud para restablecer la contraseña
            await resetPasswordRequest(token, Password);

            // Redirigir a la página de inicio de sesión u otra página
            navigate('/login');
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            // Manejar los errores según tus necesidades
            setError('Error al restablecer la contraseña');
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='img-fondo-password-reset h-screen'>
            <div className='container-password-reset'>
                <div className='cont-home-password-reset'>
                    <div className='flex'>
                        <img src="images/robopits-pequeño.webp" alt="RoboPits" style={{ width: "32px", height: "32px" }} />
                        <p className='font-sans text-xl font-bold'>RoboPits</p>
                    </div>
                    <NavLink to="/">
                        <div className='flex'>
                            <p className='font-sans text-xl font-bold'>Home</p>
                            <Icon icon="mdi:home" style={{ width: "32px", height: "32px", color: "black" }} />
                        </div>
                    </NavLink>
                </div>
                <img className='logo-password-reset' src="images/robopits-transparente2.webp" alt="RoboPits" />

                <div className='form-password-reset'>
                    <h2 className='titulo-password-reset'>Reestablece aquí tu contraseña</h2>

                    <div className='cont-msj-password-reset'>
                        <p className='mensaje-password-reset'>¡Hola! Si olvidaste tu contraseña, no te preocupes; Aquí puedes ingresar
                            una nueva contraseña, asegurate de recordarla y guardarla.</p>
                    </div>

                    <div className='contenedor-cajas-password-reset'>
                        <label className='nom-cajas-password-reset' htmlFor="Password">Nueva Contraseña:</label>
                        <div className='password-toggle-reset'>
                            <div className='input-contrasena-ojo-reset'>
                                <input
                                    className='cajas-password-reset'
                                    placeholder='Ingrese su nueva contraseña'
                                    pattern='[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'
                                    title='Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                                    1 letra minúscula, 1 símbolo raro y 1 número'
                                    type={passwordVisible ? "text" : "password"}
                                    id="Password"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" className='toggle-password-button-reset' onClick={() => togglePasswordVisibility(!passwordVisible)}>
                                    {passwordVisible ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                                </button>
                            </div>
                        </div>

                        {error && <p style={{ color: 'red', marginTop: "-1px", height: "auto", fontSize: "12px" }}>{error}</p>}
                    </div>

                    <div className='botones-password-reset'>
                        <input type="submit" id="restablecer" className="btn-password-reset" value="Restablecer" onClick={handleResetPassword} />
                    </div>

                </div>


            </div>
        </div>
    );
}

export default PasswordReset;
