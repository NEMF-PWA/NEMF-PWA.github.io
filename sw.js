importScripts('/third_party/workbox/workbox-v5.0.0/ng-workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/third_party/workbox/workbox-v5.0.0/'
});

if(workbox){
	console.log("workbox setup success");
}else{
	console.log("workbox setup fail");
}

var cacheName = 'hello-pwa:v5';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
    '/js/camera.js',
    '/images/img_avatar2.png'
];

workbox.routing.registerRoute(new RegExp('.*.*'), new workbox.strategies.CacheFirst());



/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    /*e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );*/
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
	