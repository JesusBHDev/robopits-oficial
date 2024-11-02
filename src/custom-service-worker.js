import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';

// Precarga los archivos estáticos
precacheAndRoute(self.__WB_MANIFEST || []);

// Cachea imágenes con un límite de 50 archivos y 30 días de duración
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Máximo de 50 imágenes en el caché
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

// Cachea solicitudes a la API con un límite de 100 respuestas y 7 días de duración
registerRoute(
  ({ url }) => url.origin === 'https://back-end-robopits.vercel.app', // Cambia esto a la URL de tu API
  new CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // Máximo de 100 respuestas de la API en caché
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
      }),
      {
        cacheWillUpdate: async ({ response }) => {
          // Solo cachea respuestas exitosas (status 200)
          return response && response.status === 200 ? response : null;
        },
      },
    ],
  })
);
