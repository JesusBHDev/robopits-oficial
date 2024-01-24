import React from 'react';
import "../css/Login.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";


const Login = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  //Aquí se reciben los datos del formulario
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='img-fondo-login'>
      <div className='container-login'>
        <div className='cont-home-login'>
          <NavLink to="/">
            <div className='cont-btn-home-login'>
              <Icon icon="mdi:home" style={{ fontSize: "32px", color: "black" }} />
              <p className='HomeButton-login'>Home</p>
            </div>
          </NavLink>
        </div>
        <img className='logo-login' src="images/robopits-transparente.png" alt="RoboPits" />
        <div className='form-login'>

          {/*COMIENZA A PEGAR DESDE AQUÍ */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='titulo-login'>Iniciar Sesión</h2>

            <div className='contenedor-cajas-login'>
              {/* Input del Email */}
              <label className='nom-cajas-login' htmlFor="Email">Email</label>
              <input className='cajas-login' placeholder='Ingrese su email' type="email" id="Email" autoComplete="off" {...register('Email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })} />
              {/* Mensaje de error de EMAIL: Required */}
              {errors.Email?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de email es obligatorio</p>}

              {/* Mensaje de error de EMAIL: Pattern */}
              {errors.Email?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa un correo válido, no olvides usar @ y .com</p>}
            </div>

            <div className='contenedor-cajas-login'>
              {/* Input de la contraseña */}
              <label className='nom-cajas-login' htmlFor="Password">Contraseña</label>
              <input className='cajas-login' id='Password' type="password" autoComplete="off"
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
            <div className='botones-login'>
              <input type="submit" id="login" className="btn-continuar-login" value="Continuar" />

              <div className='cont-btn-rest-contra-login'>
                <NavLink to="/restablecerContrasena">
                  <p className='btn-reestablecerContrasena-login'>¿Olvidaste tu contraseña?</p>
                </NavLink>
              </div>
              <div className='btn-creacuenta-login'>
                <p className='no-cuenta-login'>¿No tienes cuenta?</p>
                <NavLink to="/registro">
                  <p className='crea-cuenta-login'>¡Crea tu cuenta ahora!</p>
                </NavLink>
              </div>

              <div className='cont-line-login'>
                <hr className='horizontal-line-login' />
                <hr className='horizontal-line-login' />
              </div>

              <p>ó</p>

              <div className='cont-logos-login'>
                <NavLink to="https://www.google.com/intl/es-419/gmail/about/">
                  <img className='logos-login' src="images/google-logo.png" alt="Google" />
                </NavLink>
                <NavLink to="https://www.facebook.com/">
                  <img className='logos-login' src="images/facebook-logo.png" alt="Facebook" />
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