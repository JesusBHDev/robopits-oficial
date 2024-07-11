import React, { useState } from 'react'
import "../css/RestablecerContrasena.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { forgotPasswordRequest } from '../api/auth';

const RestablecerContrasena = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleRestablecer = async () => {
        try {
            // Enviar la solicitud para restablecer la contraseña
            const response = await forgotPasswordRequest(email);

            // Manejar la respuesta según tus necesidades
            console.log(response.data);

            // Puedes agregar más lógica aquí, como mostrar un mensaje al usuario
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setError('Usuario no encontrado. Verifica el correo electrónico e inténtalo de nuevo.');
        }
    };
    return (
        <div className='img-fondo-restablecer h-screen'>
            <div className='container-restablecer'>
                <div className='cont-home-restablecer'>
                    <div className='flex'>
                        <img src="images/robopits-pequeño.webp" alt="RoboPits" style={{ width: "32px", height: "32px" }} />
                        <p className='font-sans text-xl font-bold'>RoboPits</p>
                    </div>
                    <NavLink to="/">
                        <div className='flex'>
                            <p className='font-sans text-xl font-bold'>Home</p>
                            <Icon icon="mdi:home" style={{ width:"32px", height:"32px", color: "black" }} />
                        </div>
                    </NavLink>
                </div>
                <img className='logo-restablecer' src="images/robopits-transparente2.webp" alt="RoboPits" />
                <div className='form-restablecer'>
                    <h2 className='titulo-restablecer'>Restablecer Contraseña</h2>

                    <div className='cont-msj-restablecer'>
                        <p className='mensaje-restablecer'>¡Hola! Si olvidaste tu contraseña, no te preocupes; te enviaremos un correo electrónico con las
                            instrucciones que debes seguir para restablecer tu contraseña. El enlace para restablecer tu contraseña solo durará 2 minutos.</p>
                    </div>

                    <div className='contenedor-cajas-restablecer'>
                        {/* Input del Email */}
                        <label className='nom-cajas-restablecer' htmlFor="email">Email</label>
                        <input className='cajas-restablecer' placeholder='Ingrese su email' type="email" name="email" autoComplete="off" required
                            pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                            title="Ingresa un correo válido, no olvides usar @ y .com" onChange={(e) => setEmail(e.target.value)} />
                        {/* Mostrar mensaje de error */}
                        {error && <p style={{ color: 'red', marginTop: "-1px", height: "auto", fontSize: "12px" }}>{error}</p>}
                    </div>

                    <div className='botones-restablecer'>
                        <input type="submit" id="restablecer" className="btn-restablecer" value="Restablecer" onClick={handleRestablecer}
                        />

                        <NavLink to="/login">
                            <p className='btn-regresar-restablecer'>Regresar</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestablecerContrasena
