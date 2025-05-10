const CACHE_NAME = 'archery-app-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  // Add any other images or fonts you use
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Immediately activate new worker
  event.waitUntil(
    caches.open('archery-app-cache-v1')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/style.css'
      ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'archery-app-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
