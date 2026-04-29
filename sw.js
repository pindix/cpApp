const CACHE_NAME = 'mpindi-tecmed-v1';
const urlsToCache = [
    '/cpApp/',
    '/cpApp/index.html',
    '/cpApp/style.css',
    '/cpApp/script.js'
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