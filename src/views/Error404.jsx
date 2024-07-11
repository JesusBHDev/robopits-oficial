import { FooterInicio, HeaderInicio } from "../components/componentes-inicio";
import { NavLink } from "react-router-dom";

import "../css/Error404.css"
function Error404() {
  return (
    <div>
      <HeaderInicio />
      <div className="contMensajeError">
        <div className="mensajeError">
          <p className="texto1">
            <p className="texto2">¡Oops!</p>
            <p className="texto3">Parece que hicimos corto circuito ⚡</p>
            Encontraste nuestro amistoso Error 404. Pero no te preocupes, estamos en ello y solucionaremos este
            pequeño obstáculo en un abrir y cerrar de ojos. Mientras tanto, siéntete libre de explorar otras partes de
            nuestro sitio web. ¡Estamos aquí para ayudarte y hacerte sentir como en casa!
            
            <NavLink to="/Inicio">
              <p className="texto4">Ir a la pagina de Inicio</p>
            </NavLink>
          </p>
          <img src="images/robopits404.webp" alt="Error 404 Not Found" />
        </div>
      </div>
      <FooterInicio />
    </div>
  )
}

export default Error404
