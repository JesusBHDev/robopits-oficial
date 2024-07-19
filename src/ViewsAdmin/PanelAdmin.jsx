import React from 'react';
import { EncabezadoAdmin, BotonMenu } from '../ViewsAdmin/ComponenetesAdmin/Encabezado.jsx';
function PanelAdmin() {
  return (
    <div className="flex">
      <BotonMenu />
      <div className="flex-1 ml-40">
        <EncabezadoAdmin />
        <div className="p-6">
    
        </div>
      </div>
    </div>
  );
}
export default PanelAdmin;
