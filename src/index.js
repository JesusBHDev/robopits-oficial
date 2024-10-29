// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Rutas } from './routers/Rutas';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <HelmetProvider>
      <RouterProvider router={Rutas} />
    </HelmetProvider>
  </AuthProvider>
);

// Registrar el service worker manualmente
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
}
