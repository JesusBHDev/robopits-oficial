import React from 'react'
import "../css/Registro.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
const
  Registro = () => {
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
        <div className='container-registro'>
          <img className='logo' src="images/robopits-transparente.png" alt="RoboPits" />
          <div className='form-registro'>
            <h2 className='titulo'>Crea una cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* AQUI COMIENZA A COPIAR */}
              <div>
                {/* Input del Nombre de Usuario */}
                <label className='nom-cajas' htmlFor="username">Nombre de usuario</label>
                <input className="cajas" type="user" placeholder="Ingrese su nombre de usuario" {...register('username', {
                  required: true,
                  maxLength: 10,
                  pattern: /^[a-zA-Z][a-zA-Z0-9-_]{3,32}$/,
                })} />
                {/* Mensaje de error de USERNAME: Required */}
                {errors.username?.type === 'required' &&
                  <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de nombre de usuario es obligatorio</p>}

                {/* Mensaje de error de USERNAME: maxLength  */}
                {errors.username?.type === 'maxLength' &&
                  <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de nombre no puede contener más de 10 caracteres</p>}

                {/* Mensaje de error de USERNAME: Pattern */}
                {errors.username?.type === 'pattern' &&
                  <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa un nombre de usuario valido. Solo puedes usar letras, números y guión bajo o alto</p>}
              </div>

              <div>
                {/* Input del Email */}
                <label className='nom-cajas' htmlFor="email">Email</label>
                <input className='cajas' placeholder='Ingrese su email' type="email" {...register('email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })} />
                {/* Mensaje de error de EMAIL: Required */}
                {errors.email?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de email es obligatorio</p>}

                {/* Mensaje de error de EMAIL: Pattern */}
                {errors.email?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa un correo válido, no olvides usar @ y .com</p>}
              </div>

              <div>
                {/* Input de la contraseña */}
                <label className='nom-cajas' htmlFor="passw">Contraseña</label>
                <input className='cajas' type="password" autoComplete="off"
                  placeholder="Ingrese su contraseña" {...register('passw', {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  })} />
                {/* Mensaje de error de CONTRASEÑA: Required */}
                {errors.passw?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de contraseña es obligatorio</p>}

                {/* Mensaje de error de CONTRASEÑA: Pattern */}
                {errors.passw?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                  1 letra minúscula, 1 símbolo raro y 1 número</p>}
              </div>

              <div>
                <label className='nom-cajas' htmlFor="passw2">Confirmar contraseña</label>
                <input className='cajas' type="password" autoComplete="off"
                  placeholder="Ingrese su contraseña de nuevo" {...register('passw2', {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  })} />
                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Required */}
                {errors.passw2?.type === 'required' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>El campo de confirmar contraseña es obligatorio</p>}

                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Pattern */}
                {errors.passw2?.type === 'pattern' && <p style={{ color: "red", marginTop: "-20px", marginBottom: "5px" }}>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                  1 letra minúscula, 1 símbolo raro y 1 número</p>}
              </div>

              {/* AQUI TERMINA DE COPIAR */}
              <div className='botones'>
                <input type="submit" className="btn-registrar" value="Registrarse" />

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
            </form>
          </div>
        </div>
      </div>
    )
  }

export default Registro
