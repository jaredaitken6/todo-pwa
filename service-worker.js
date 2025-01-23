const CACHE_NAME = 'to-do-pwa-cache-v1';
const FILES_TO_CACHE = [
    '/todo-pwa/', 
    '/todo-pwa/index.html',
    '/todo-pwa/style.css',
    '/todo-pwa/app.js',
    '/todo-pwa/manifest.json',
    '/todo-pwa/icons/flame.png',
    '/todo-pwa/icons/skull.png'
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