const CACHE_NAME = 'apex-site-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=20261030-1',
  '/script.js?v=20261030-1',
  '/manifest.json',
  '/icon-512.png',
  '/favicon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function cacheResponse(request, response) {
  if (!response || response.status !== 200 || response.type !== 'basic') return;
  const clone = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
}

// Pages come from the network first so a deploy shows up on the next load.
function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      cacheResponse(request, response);
      return response;
    })
    .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')));
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      cacheResponse(request, response);
      return response;
    });
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});
