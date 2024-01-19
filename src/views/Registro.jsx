import React from 'react'
import "../css/Registro.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const
  Registro = () => {
    return (
      <div className='img-fondo'>
        <NavLink to="/">
          <div className='cont-btn-home'>
            <Icon icon="mdi:home" style={{ fontSize: "32px", color: "black" }} />
            <p className='HomeButton'>Home</p>
          </div>
        </NavLink>
        <div className='container-registro'>
          <img className='logo' src="images/robopits-transparente.png" alt="RoboPits" />
          <div className='form-registro'>
            <h2 className='titulo'>Crea una cuenta</h2>

            {/* Input del Nombre de Usuario */}
            <label className='nom-cajas' for="username">Nombre de usuario</label>
            <input class="cajas" type="user" name="username" placeholder="Ingrese su nombre de usuario" autocomplete="off"
              pattern="[a-zA-Z][a-zA-Z0-9-_]{3,32}" required title="Ingresa un nombre de usuario valido. Solo puedes usar letras, números y guión bajo o alto" maxlength="30" />

            {/* Input del Email */}
            <label className='nom-cajas' for="email">Email</label>
            <input className='cajas' placeholder='Ingrese su email' type="email" name="email" autocomplete="off" required
              pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
              title="Ingresa un correo válido, no olvides usar @ y .com" />

            {/* Input de la contraseña */}
            <label className='nom-cajas' for="passw">Contraseña</label>
            <input className='cajas' type="password" name="passw" autocomplete="off" required
              placeholder="Ingrese su contraseña" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
              1 letra minúscula, 1 símbolo raro y 1 número" />

            <label className='nom-cajas' for="passw2">Confirmar contraseña</label>
            <input className='cajas' type="password" name="passw2" autocomplete="off" required
              placeholder="Ingrese su contraseña de nuevo" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
              1 letra minúscula, 1 símbolo raro y 1 número" />

            <div className='botones'>
              <input type="submit" id="registrar" class="btn-registrar" value="Registrarse" onclick="" />

              <div className='btn-iniciarsesion'>
                <p className='con-cuenta'>¿Ya tienes cuenta?</p>
                <NavLink to="/login">
                  <p className='inicia-ahora'>¡Inicia sesión ahora!</p>
                </NavLink>
              </div>

              <div className='cont-line'>
                <hr className='horizontal-line' />
                <hr className='horizontal-line' />
              </div>

              <p>ó</p>

              <div className='cont-logos'>
                <NavLink to="https://www.google.com/intl/es-419/gmail/about/">
                  <img className='logos' src="images/google-logo.png" alt="Google" />
                </NavLink>
                <NavLink to="https://www.facebook.com/">
                  <img className='logos' src="images/facebook-logo.png" alt="Facebook" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default
  Registro