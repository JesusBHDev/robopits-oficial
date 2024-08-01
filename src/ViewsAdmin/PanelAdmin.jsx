import React from 'react';
import { EncabezadoAdmin } from '../ViewsAdmin/ComponenetesAdmin/Encabezado.jsx';
import MapaEntrega from './ComponenetesAdmin/MapaEntrega.js';

function PanelAdmin() {
  return (
    <div className="flex">
      <div className="flex-1 ml-40">
        <EncabezadoAdmin />
        <h1>Hola Administrador</h1>
      </div>
    </div>
  );
}

export default PanelAdmin;
