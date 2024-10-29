// src/serviceWorker.js
const CACHE_NAME = 'robopits-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robopits-192x192.png',
  '/robopits-512x512.png',
  // Agrega otros recursos que quieras cachear
];

// Evento de instalación - Cachea los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Abriendo caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación - Limpiar caché antigua
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

// Evento de fetch - Sirve desde la caché o hace fetch a la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Exporta la función register para usarla en index.js
export function register() {
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
}
