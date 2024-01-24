import React from 'react'
import "../css/Registro.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { validaContrasenas } from '../components/Validaciones';
const
  Registro = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    //Aquí se reciben los datos del formulario
    const onSubmit = (data) => {
      console.log(data);
    }
    return (
      <div className='img-fondo-registro'>
        <div className='container-registro'>
          <div className='cont-home-registro'>
            <NavLink to="/">
              <div className='cont-btn-home-registro'>
                <Icon icon="mdi:home" style={{ fontSize: "32px", color: "black" }} />
                <p className='HomeButton-registro'>Home</p>
              </div>
            </NavLink>
          </div>
          <img className='logo-registro' src="images/robopits-transparente.png" alt="RoboPits" />
          <div className='form-registro'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='titulo-registro'>Crea una cuenta</h2>
              {/* AQUI COMIENZA A COPIAR */}
              <div className='contenedor-cajas-registro'>
                {/* Input del Nombre de Usuario */}
                <label className='nom-cajas-registro' htmlFor="Nombre">Nombre de usuario</label>
                <input className="cajas-registro" id='Nombre' type="user" placeholder="Ingrese su nombre de usuario" {...register('Nombre', {
                  required: true,
                  maxLength: 10,
                  pattern: /^[a-zA-Z][a-zA-Z0-9-_]{3,32}$/,
                })} />
                {/* Mensaje de error de USERNAME: Required */}

                {errors.Nombre?.type === 'required' &&
                  <div className='contenedor-msj-error-registro'><p className='mensajes-error-registro'>El campo de nombre de usuario es obligatorio</p></div>}

                {/* Mensaje de error de USERNAME: maxLength  */}
                {errors.Nombre?.type === 'maxLength' &&
                  <p className='mensajes-error-registro'>El campo de nombre no puede contener más de 10 caracteres</p>}

                {/* Mensaje de error de USERNAME: Pattern */}
                {errors.Nombre?.type === 'pattern' &&
                  <p className='mensajes-error-registro'>Ingresa un nombre de usuario valido. Solo puedes usar letras, números y guión bajo o alto</p>}
              </div>

              <div className='contenedor-cajas-registro'>
                {/* Input del Email */}
                <label className='nom-cajas-registro' htmlFor="Email">Email</label>
                <input className='cajas-registro' id='Email' placeholder='Ingrese su email' type="email" {...register('Email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })} />
                {/* Mensaje de error de EMAIL: Required */}
                {errors.Email?.type === 'required' && <p className='mensajes-error-registro'>El campo de email es obligatorio</p>}

                {/* Mensaje de error de EMAIL: Pattern */}
                {errors.Email?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa un correo válido, no olvides usar @ y .com</p>}
              </div>

              <div className='contenedor-cajas-registro'>
                {/* Input de la contraseña */}
                <label className='nom-cajas-registro' htmlFor="Password">Contraseña</label>
                <input className='cajas-registro' id='Password' type="password" autoComplete="off"
                  placeholder="Ingrese su contraseña" {...register('Password', {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    validate: validaContrasenas
                  })} />
                {/* Mensaje de error de CONTRASEÑA: Required */}
                {errors.Password?.type === 'required' && <p className='mensajes-error-registro'>El campo de contraseña es obligatorio</p>}

                {/* Mensaje de error de CONTRASEÑA: Pattern */}
                {errors.Password?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                  1 letra minúscula, 1 símbolo raro y 1 número</p>}

                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Validacion */}
                {errors.Password && <p className='mensajes-error-registro'>Las contraseñas deben coincidir</p>}
              </div>

              <div className='contenedor-cajas-registro'>
                <label className='nom-cajas-registro' htmlFor="Password2">Confirmar contraseña</label>
                <input className='cajas-registro' id='Password2' type="password" autoComplete="off"
                  placeholder="Ingrese su contraseña de nuevo" {...register('Password2', {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    validate: validaContrasenas
                  })} />
                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Required */}
                {errors.Password2?.type === 'required' && <p className='mensajes-error-registro'>El campo de confirmar contraseña es obligatorio</p>}

                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Pattern */}
                {errors.Password2?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                  1 letra minúscula, 1 símbolo raro y 1 número</p>}

                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Validacion */}
                {errors.Password2 && <p className='mensajes-error-registro'>Las contraseñas deben coincidir</p>}

              </div>

              {/* AQUI TERMINA DE COPIAR */}
              <div className='botones-registro'>
                <input type="submit" className="btn-registrar-registro" value="Registrarse" />

                <div className='btn-iniciarsesion-registro'>
                  <p className='con-cuenta-registro'>¿Ya tienes cuenta?</p>
                  <NavLink to="/login">
                    <p className='inicia-ahora-registro'>¡Inicia sesión ahora!</p>
                  </NavLink>
                </div>

                <div className='cont-line-registro'>
                  <hr className='horizontal-line-registro' />
                  <hr className='horizontal-line-registro' />
                </div>

                <p>ó</p>

                <div className='cont-logos-registro'>
                  <NavLink to="https://www.google.com/intl/es-419/gmail/about/">
                    <img className='logos-registro' src="images/google-logo.png" alt="Google" />
                  </NavLink>
                  <NavLink to="https://www.facebook.com/">
                    <img className='logos-registro' src="images/facebook-logo.png" alt="Facebook" />
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