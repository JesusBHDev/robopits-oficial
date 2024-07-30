import { useState, useEffect } from 'react'
import "../css/Registro.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { validaContrasenas } from '../components/Validaciones';
import { useAuth } from "../context/AuthContext.jsx";
import { Helmet } from "react-helmet-async";
import axios from 'axios';
import Captcha from '../components/Captcha';

const Registro = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async values => {
    try {
      setLoading(true); // Establece el estado de carga a true al iniciar la acción
  
      // Validar el correo antes de realizar otras acciones
      console.log(values.Email);
      const emailValidationResult = await ValidaEmail(values.Email);
  
      setLoading(false); // Establece el estado de carga a false al completar la acción
      setFormValidated(true);
      if (!emailValidationResult.isValid) {
        // Mostrar mensaje de error
        alert(emailValidationResult.message);
        return;
      }
  
      if (captchaVerified) {
        // Realiza acciones adicionales para enviar el formulario
        alert('Usuario verificado. Enviar formulario.');
      } else {
        alert('Eres un robot. No se puede enviar el formulario.');
      }
      signup(values);
    } catch (error) {
      // Muestra el error en caso de fallo
      console.error("Error en el formulario:", error);
      // Podrías también manejar el error de otras maneras, como mostrar un mensaje al usuario
      alert("Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente más tarde.");
    }
  });
  

  const [loading, setLoading] = useState(false);

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const [formValidated, setFormValidated] = useState(false);

  const handleVerificationChange = (value) => {
    console.log(value);
    setCaptchaVerified(!!value); // Convierte el valor en un booleano y lo asigna al estado
  };

  const ValidaEmail = async (email) => {
    try {
      const apiKey = '9JiPAAOCRYa4WrDCpZje68LKtJc80cap7rg0'; // Reemplazar con tu clave API real
      const url = `https://mailbite.io/api/check?key=${apiKey}&email=${email}`;

      const response = await axios.get(url);

      const result = response.data;
      console.log('Correo:', result);

      /* Esto se ejecuta cuando el correo ingresado al formulario es Valido */
      if (result.status === 'ok' && result.email_status === 'VALID') {
        console.log('Correo válido:', result);
        return { isValid: true, message: 'El correo es válido' };
      }
      /* Esto se ejecuta cuando el correo ingresado al formulario es Invalido */
      else if(result.status === 'ok' && result.email_status === 'INVALID'){
        return {isValid: false, message: 'Error: Correo Inválido'};
      }
      /* Esto se ejecuta cuando ya no tenemos tokens en la API */
      else{
        console.error('Error en el registro:', result);

        if (result.email_status === 'You have reached your limit.') {
          console.log('Ya no tienes tokens');
          return { isValid: false, message: 'Ya no tienes tokens' };
        } else {
          return { isValid: false, message: result.message || 'El correo no existe.' };
        }
      }

      /* Aquí se ejecuta un error en caso de que no funcione la validacion con la API */
    } catch (error) {
      console.error('Error 500', error);
      setTimeout(() => {
        alert('Error capo');
      }, 2000);
      return { isValid: false, message: 'Error 500' };
    }
  };



  const [passwordVisible, setPasswordVisible] = useState(false);

  const [password2Visible, setPassword2Visible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePassword2Visibility = () => {
    setPassword2Visible(!password2Visible);
  };

  return (
    <div className='img-fondo-registro h-screen'>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            script-src 'self' https://www.google.com https://www.gstatic.com https://api.unisvg.com https://api.iconify.design https://mailbite.io/api/check;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com;
            style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com;
            connect-src 'self' https://api.simplesvg.com/ https://www.google.com https://api.unisvg.com https://api.iconify.design https://backend-robo.vercel.app https://mailbite.io/api/check;
            object-src 'none';
            frame-src 'self' https://www.google.com;
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' https://firebasestorage.googleapis.com
            `}
        ></meta>
      </Helmet>
      <div className='container-registro'>
        <div className='cont-home-registro'>
          <div className='flex'>
            <img src="images/robopits-pequeño.webp" alt="RoboPits" style={{ width: "32px", height: "32px" }} />
            <p className='font-sans text-xl font-bold'>RoboPits</p>
          </div>
          <NavLink to="/">
            <div className='flex'>
              <p className='font-sans text-xl font-bold'>Home</p>
              <Icon icon="mdi:home" style={{ width: "32px", height: "32px", color: "black" }} />
            </div>
          </NavLink>
        </div>
        <img className='logo-registro' src="images/robopits-transparente2.webp" alt="RoboPits" />
        <div className='form-registro'>
          <form onSubmit={onSubmit}>
            <h2 className='titulo-registro'>Crea una cuenta</h2>
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

              <div className='contenedor-cajas-registro'>
                {/* Input de la contraseña */}
                <label className='nom-cajas-registro' htmlFor="Password">Contraseña</label>
                <div className='password-toggle'>
                  <div className='input-contrasena-ojo'>
                    <input className='cajas-registro' id='Password' type={passwordVisible ? "text" : "password"} autoComplete="off"
                      placeholder="Ingrese su contraseña" {...register('Password', {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        validate: validaContrasenas

                      })} />
                    <button type="button" className='toggle-password-button' onClick={() => togglePasswordVisibility(!passwordVisible)}>
                      {passwordVisible ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                    </button>
                  </div>
                </div>
                {/* Mensaje de error de CONTRASEÑA: Required */}
                {errors.Password?.type === 'required' && <p className='mensajes-error-registro'>El campo de contraseña es obligatorio</p>}

                {/* Mensaje de error de CONTRASEÑA: Pattern */}
                {errors.Password?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                  1 letra minúscula, 1 símbolo raro y 1 número</p>}

                {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Validacion */}
                {errors.Password && <p className='mensajes-error-registro'>Las contraseñas deben coincidir</p>}

              </div>
            </div>

            <div className='contenedor-cajas-registro'>
              <div className='password-toggle2'>
                <label className='nom-cajas-registro' htmlFor="Password2">Confirmar contraseña</label>
                <div className='input-contrasena-ojo'>
                  <input className='cajas-registro' id='Password2' type={password2Visible ? "text" : "password"} autoComplete="off"
                    placeholder="Ingrese su contraseña de nuevo" {...register('Password2', {
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      validate: validaContrasenas
                    })} />
                  <button type="button" className='toggle-password-button2' onClick={() => togglePassword2Visibility(!password2Visible)}>
                    {password2Visible ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                  </button>
                </div>
              </div>
              {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Required */}
              {errors.Password2?.type === 'required' && <p className='mensajes-error-registro'>El campo de confirmar contraseña es obligatorio</p>}

              {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Pattern */}
              {errors.Password2?.type === 'pattern' && <p className='mensajes-error-registro'>Ingresa una contraseña válida con mínimo 8 cáracteres. Debes usar como mínimo 1 letra mayúscula,
                1 letra minúscula, 1 símbolo raro y 1 número</p>}

              {/* Mensaje de error de CONFIRMAR CONTRASEÑA: Validacion */}
              {errors.Password2 && <p className='mensajes-error-registro'>Las contraseñas deben coincidir</p>}
            </div>

            <div className='botones-registro'>
              <Captcha onVerificationChange={handleVerificationChange} />
              <input type="submit" className="btn-registrar-registro" value={loading ? "Cargando..." : "Registrarse"} disabled={!formValidated && loading || !captchaVerified && loading} />

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
                  <img className='logos-registro' src="images/google-logo.webp" alt="Google" />
                </NavLink>
                <NavLink to="https://www.facebook.com/">
                  <img className='logos-registro' src="images/facebook-logo.webp" alt="Facebook" />
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