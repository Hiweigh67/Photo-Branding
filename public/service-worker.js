const CACHE_NAME = 'hiweigh-brander-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/js/jquery.js',
  '/js/html2canvas.min.js',
  '/js/script.js',
  '/style/style.css',
  '/images/logo.png',
  '/images/image.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
