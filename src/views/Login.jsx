import React from 'react';
import "../css/Login.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { type } from '@testing-library/user-event/dist/type';

const Login = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  //Aquí se reciben los datos del formulario
  const onSubmit = (data) => {
    console.log(data);
  }

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
          
          {/*COMIENZA A PEGAR DESDE AQUÍ */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='titulo'>Iniciar Sesión</h2>

            <div>
              {/* Input del Email */}
              <label className='nom-cajas' for="Email">Email</label>
              <input className='cajas' placeholder='Ingrese su email' type="email" id="Email" autocomplete="off" {...register('Email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })} />
              {/* Mensaje de error de EMAIL: Required */}
              {errors.Email?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de email es obligatorio</p>}

              {/* Mensaje de error de EMAIL: Pattern */}
              {errors.Email?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa un correo válido, no olvides usar @ y .com</p>}
            </div>

            <div>
              {/* Input de la contraseña */}
              <label className='nom-cajas' htmlFor="Password">Contraseña</label>
              <input className='cajas' id='Password' type="password" autoComplete="off"
                placeholder="Ingrese su contraseña" {...register('Password', {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                })} />
              {/* Mensaje de error de CONTRASEÑA: Required */}
              {errors.Password?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de contraseña es obligatorio</p>}

              {/* Mensaje de error de CONTRASEÑA: Pattern */}
              {errors.Password?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                1 letra minúscula, 1 símbolo raro y 1 número</p>}
            </div>

            {/* TERMINA DE COPIAR AQUÍ */}
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
