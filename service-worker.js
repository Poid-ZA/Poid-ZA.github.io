const CACHE_NAME = 'apex-site-v2';
const ASSETS = [
  '/Poid-ZA.github.io/',
  '/Poid-ZA.github.io/index.html',
  '/Poid-ZA.github.io/style.css',
  '/Poid-ZA.github.io/script.js',
  '/Poid-ZA.github.io/manifest.json',
  '/Poid-ZA.github.io/icon-512.png',
  '/Poid-ZA.github.io/favicon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
