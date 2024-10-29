// src/serviceWorker.js

// Nombre y versión de la caché
const CACHE_NAME = 'robopits-cache-v1';
const urlsToCache = [
  '/',           // Página principal
  '/index.html', // HTML principal
  '/manifest.json',
  '/robopits-192x192.png',
  '/robopits-512x512.png',
  // Agrega aquí otros recursos estáticos (CSS, JS, imágenes) que quieras cachear
];

// Evento de instalación - Cachea los archivos necesarios
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Abriendo caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación - Elimina cachés antiguas si cambia la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch - Responde con recursos de la caché o hace fetch a la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, responde con él; si no, sigue a la red
      return response || fetch(event.request);
    })
  );
});
