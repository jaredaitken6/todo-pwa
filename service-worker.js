const CACHE_NAME = 'to-do-pwa-cache-v1';
const FILES_TO_CACHE = [
    '/', 
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/flame.png',
    '/icons/skull.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files...');
                return cache.addAll(FILES_TO_CACHE).catch((err) => {
                    console.error('Failed to cache:', err);
                });
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});