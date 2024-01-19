import React from 'react';
import "../css/Login.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const Login = () => {
  return (
    <div className='img-fondo'>
      <NavLink to="/">
      <div className='cont-btn-home'>
          <Icon icon="mdi:home" style={{ fontSize: "32px", color: "black" }} />
          <p className='HomeButton'>Home</p>
      </div>
      </NavLink>
      <div className='container-login'>
        <img className='logo' src="images/robopits-transparente.png" alt="RoboPits" />
        <div className='form-login'>
          <h2 className='titulo'>Iniciar Sesión</h2>

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

          <div className='botones'>
            <input type="submit" id="login" class="btn-continuar" value="Continuar" onclick="" />

            <NavLink to="/restablecerContrasena">
              <p className='btn-reestablecerContrasena'>¿Olvidaste tu contraseña?</p>
            </NavLink>

            <div className='btn-creacuenta'>
              <p className='no-cuenta'>¿No tienes cuenta?</p>
              <NavLink to="/registro">
                <p className='crea-cuenta'>¡Crea tu cuenta ahora!</p>
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

export default Login