// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Rutas } from './routers/Rutas';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { guardarSuscripcion } from './api/auth.js';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://2fec83ecbf42fa28160c6d6f758b6309@o4508344919654400.ingest.us.sentry.io/4508344982437888',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const App = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Solo suscribirse si el usuario está autenticado y tiene un `userId`
    if (isAuthenticated && user) {
      subscribeUserToPush(user.id); // Pasa el userId para almacenar la suscripción en el backend
    }
  }, [isAuthenticated, user]);

  return (
    <HelmetProvider>
      <RouterProvider router={Rutas} />
    </HelmetProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
// Convierte la clave pública VAPID en un Uint8Array para suscribirse
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+') // Eliminamos el escape innecesario
    .replace(/_/g, '/'); // Eliminamos el escape innecesario
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Función para suscribir al usuario a notificaciones push
export async function subscribeUserToPush(userId) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Espera a que el Service Worker esté listo
      const registration = await navigator.serviceWorker.ready;

      // Suscribe al usuario a Push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          'BJCNOQ2hE5mas0I1fxLOW22VOJOdfnwPjMzcVzDHRXKVe-rX6Jl9WXh-8aauQsqdv5GMBDHfyrIlYP47rObb-Ro'
        ),
      });

      console.log('Usuario suscrito:', subscription);

      // Llama a la API para guardar la suscripción en el servidor
      await guardarSuscripcion(userId, subscription);
      console.log('Suscripción guardada en el servidor');
    } catch (error) {
      console.error('Error al suscribir al usuario:', error);
    }
  } else {
    console.warn('Notificaciones Push no son compatibles en este navegador.');
  }
}
