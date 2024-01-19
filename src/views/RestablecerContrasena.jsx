import React from 'react'
import "../css/RestablecerContrasena.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
const RestablecerContrasena = () => {
    return (
        <div className='img-fondo'>
            <NavLink to="/">
                <div className='cont-btn-home'>
                    <Icon icon="mdi:home" style={{ fontSize: "32px", color: "black" }} />
                    <p className='HomeButton'>Home</p>
                </div>
            </NavLink>
            <div className='container-restablecer'>
                <img className='logo' src="images/robopits-transparente.png" alt="RoboPits" />
                <div className='form-restablecer'>
                    <h2 className='titulo'>Restablecer Contraseña</h2>

                    <div className='cont-msj'>
                        <p className='mensaje-restablecer'>¡Hola! Si olvidaste tu contraseña, no te preocupes; te enviaremos un correo electrónico con las
                            instrucciones que debes seguir para restablecer tu contraseña.</p>
                    </div>

                    {/* Input del Email */}
                    <label className='nom-cajas' for="email">Email</label>
                    <input className='cajas' placeholder='Ingrese su email' type="email" name="email" autocomplete="off" required
                        pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                        title="Ingresa un correo válido, no olvides usar @ y .com" />

                    <div className='botones'>
                        <input type="submit" id="restablecer" class="btn-restablecer" value="Restablecer" onclick="" />

                        <NavLink to="/login">
                            <p className='btn-regresar'>Regresar</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestablecerContrasena
