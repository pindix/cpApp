const CACHE_NAME = 'mpindi-tecmed-v1';
const urlsToCache = [
    '/cp app/',
    '/cp app/index.html',
    '/cp app/style.css',
    '/cp app/script.js',
    '/cp app/dosagem/index.html',
    '/cp app/exames/index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});