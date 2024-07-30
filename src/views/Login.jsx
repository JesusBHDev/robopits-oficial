import {useState, useEffect} from 'react';
import "../css/Login.css";
import { NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Captcha from '../components/Captcha';

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const {signin,isAuthenticated} =  useAuth();
  const navigate = useNavigate()

  const [captchaVerified, setCaptchaVerified] = useState(false);


  const handleVerificationChange = (value) => {
    console.log(value);
    setCaptchaVerified(!!value); // Convierte el valor en un booleano y lo asigna al estado
  };


  const onSubmit = handleSubmit(data => {
    if (captchaVerified) {
      // Realiza acciones adicionales para enviar el formulario
      alert('Usuario verificado. Enviar formulario.');
    } else {
      alert('Eres un robot. No se puede enviar el formulario.');
    }
    
    signin(data);
  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/todos-los-productos')
  }, [isAuthenticated])

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='img-fondo-login h-screen'>
      <Helmet>
      <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            script-src 'self' https://www.google.com https://www.gstatic.com https://api.unisvg.com https://api.iconify.design https://mailbite.io/api/check;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com;
            style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com;
            connect-src 'self' https://api.simplesvg.com/ https://www.google.com https://api.unisvg.com https://api.iconify.design https://backend-robo.vercel.app https://back-end-robopits.vercel.app http://localhost:4000 https://mailbite.io/api/check;
            object-src 'none';
            frame-src 'self' https://www.google.com;
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' https://firebasestorage.googleapis.com;
            `}
        ></meta>
      </Helmet>
      <div className='container-login'>
        <div className='cont-home-login'>
          <div className='flex'>
            <img src="images/robopits-pequeño.webp" alt="RoboPits" style={{ width: "32px", height:"32px"}} />
            <p className='font-sans text-xl font-bold'>RoboPits</p>
          </div>
          <NavLink to="/">
            <div className='flex'>
              <p className='font-sans text-xl font-bold'>Home</p>
              <Icon icon="mdi:home" style={{ width:"32px", height:"32px", color: "black" }} />
            </div>
          </NavLink>
        </div>
        <img className='logo-login' src="images/robopits-transparente2.webp" alt="RoboPits" />
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
              {errors.Email?.type === 'required' && <p style={{ color: "red", marginTop: "-1px", height: "auto", fontSize: "12px" }}>El campo de email es obligatorio</p>}

              {/* Mensaje de error de EMAIL: Pattern */}
              {errors.Email?.type === 'pattern' && <p style={{ color: "red", marginTop: "-1px", height: "auto", fontSize: "12px" }}>Ingresa un correo válido, no olvides usar @ y .com</p>}
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
                  <img className='logos-login' src="images/google-logo.webp" alt="Google" />
                </NavLink>
                <NavLink to="https://www.facebook.com/">
                  <img className='logos-login' src="images/facebook-logo.webp" alt="Facebook" />
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