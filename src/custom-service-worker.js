/* eslint-env serviceworker */
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly } from 'workbox-strategies';
// Precarga archivos estáticos
precacheAndRoute(self.__WB_MANIFEST || []);

// Cachea páginas de la aplicación para navegación offline
registerRoute(
  ({ request }) => request.mode === 'navigate', // Filtra solo solicitudes de navegación (páginas)
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20, // Limita el cache de páginas a 20 entradas
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Cachea fuentes web para uso offline
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30, // Limita el caché de fuentes a 30 entradas
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
      }),
    ],
  })
);

// Cachea imágenes con un límite de 50 archivos y 30 días de duración
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// Cachea JSON y otros datos estáticos
registerRoute(
  ({ request }) => request.destination === 'document', // Esto incluye JSON y similares
  new StaleWhileRevalidate({
    cacheName: 'data-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Limita a 50 respuestas en caché
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Cachea archivos CSS y JS sin límite, usando Stale-While-Revalidate
registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Evitar el cacheo para las solicitudes de pedidos
registerRoute(
  ({ url }) =>
    url.origin === 'https://back-end-robopits.vercel.app' &&
    url.pathname.startsWith('/api/pedidos'),
  new NetworkOnly()
);

// Cachea solicitudes a la API con un límite de 100 respuestas y 7 días de duración
registerRoute(
  ({ url }) => url.origin === 'https://back-end-robopits.vercel.app',
  new CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
      {
        cacheWillUpdate: async ({ response }) =>
          response?.ok ? response : null,
      },
    ],
  })
);

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'Tienes una nueva notificación',
    icon: data.icon || '/', // Ícono pequeño, que aparece a la izquierda
    image: data.image || '/', // Imagen grande o de perfil, que aparece en el centro o más destacado
    data: data.url || '/', // URL a la que redirige al hacer clic
  };

  console.log('Mostrando notificación: ', options);

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Nueva Notificación',
      options
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data;
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
