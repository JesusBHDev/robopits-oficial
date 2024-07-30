import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solución para el problema de los iconos con Webpack
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Coordenadas de los puntos de entrega de pedidos
const entregas = [
  { lat: 21.145, lng: -98.415, info: 'Área con más pedidos' },
  { lat: 21.135, lng: -98.420, info: 'Segunda área con más pedidos' },
  { lat: 21.151860, lng: -98.382335, info: 'Zona con pedidos fuera de Huejutla' },
  // Agrega más puntos según sea necesario
];

function MapaEntrega() {
  return (
    <MapContainer center={[21.145, -98.415]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {entregas.map((entrega, index) => (
        <Marker key={index} position={[entrega.lat, entrega.lng]}>
          <Popup>{entrega.info}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaEntrega;
