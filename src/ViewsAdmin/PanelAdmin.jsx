import React from 'react';
import { EncabezadoAdmin, BotonMenu } from '../ViewsAdmin/ComponenetesAdmin/Encabezado.jsx';
import MapaEntrega from './ComponenetesAdmin/MapaEntrega.js';

function PanelAdmin() {
  return (
    <div className="flex">
      <BotonMenu />
      <div className="flex-1 ml-40">
        <EncabezadoAdmin />
        <div className="p-6">
          <h3>ghjkl</h3>
          <h3>ghjkl</h3>
          <div className="text-center mb-20">
            <h2 className="text-2xl font-bold">Lugares con pedidos más recurrentes</h2>
          </div>
          <div className="flex justify-center">
            <div style={{ height: '500px', width: '80%' }}>
              <MapaEntrega />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;
