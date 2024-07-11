import {useState, useEffect} from 'react';
import "../css/Login.css";
import { NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const IniciarSesion = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const {signinEmpleado,isEmpleadoAuthenticated, errors : loginErrors} =  useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signinEmpleado(data)
  })

  useEffect(()=>{
    if(isEmpleadoAuthenticated) navigate('/PanelAdmin')
  }, [isEmpleadoAuthenticated])

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='img-fondo-login'>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
                    default-src 'self';
                    script-src 'self';  
                    connect-src  http://localhost:4000;
                  `}
        ></meta>
      </Helmet>
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

          <form onSubmit={onSubmit}>
            <h2 className='titulo-login'>Iniciar Sesión</h2>

            <div className='contenedor-cajas-login'>
              {/* Input del Email */}
              <label className='nom-cajas-login' htmlFor="Email">Email</label>
              <input className='cajas-login' placeholder='Ingrese su email' type="email" id="Email"  {...register('Email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })} />
              {/* Mensaje de error de EMAIL: Required */}
              {errors.Email?.type === 'required' && <p style={{ color: "red", marginTop: "-1px", height:"auto", fontSize:"12px"}}>El campo de email es obligatorio</p>}

              {/* Mensaje de error de EMAIL: Pattern */}
              {errors.Email?.type === 'pattern' && <p style={{ color: "red", marginTop: "-1px", height:"auto", fontSize:"12px"}}>Ingresa un correo válido, no olvides usar @ y .com</p>}
            </div>

            <div className='contenedor-cajas-registro'>
              {/* Input de la contraseña */}
              <label className='nom-cajas-registro' htmlFor="Password">Contraseña</label>
              <div className='password-toggle-login'>
                <div className='input-contrasena-ojo-login'>
                  <input className='cajas-registro' id='Password' type={passwordVisible ? "text" : "password"} autoComplete="off"
                    placeholder="Ingrese su contraseña" {...register('Password', {
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,

                    })} />
                  <button type="button" className='toggle-password-button-login' onClick={() => togglePasswordVisibility(!passwordVisible)}>
                    {passwordVisible ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                  </button>
                </div>
              </div>
              {/* Mensaje de error de CONTRASEÑA: Required */}
              {errors.Password?.type === 'required' && <p className='mensajes-error-registro'>El campo de contraseña es obligatorio</p>}

              {/* Mensaje de error de CONTRASEÑA: Pattern */}
              {errors.Password?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
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
            <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
          </form>
        </div>
      </div>
    </div>
  )
}

export default IniciarSesion