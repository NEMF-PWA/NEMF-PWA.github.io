importScripts('/configuration.js');
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js')
const firebaseConfig = {
  apiKey: "AIzaSyBtB3nk9k-AUuBQvcplmUbdwI13HIWZT6U",
  authDomain: "notification-test-25d1e.firebaseapp.com",
  databaseURL: "https://notification-test-25d1e.firebaseio.com",
  projectId: "notification-test-25d1e",
  storageBucket: "notification-test-25d1e.appspot.com",
  messagingSenderId: "827645719830",
  appId: "1:827645719830:web:955b36b22b04bebdb60c37"
};

firebase.initializeApp(firebaseConfig);
  if(firebase){
  // Initialize Firebase
	const messaging = firebase.messaging();
	console.log('messaging',messaging);


  const showMessage = function(payload){
    console.log('showMessage', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        image: payload.notification.image,
        click_action: payload.notification.click_action,
        data:payload.notification.click_action
    }  
    console.log('notificationOptions', notificationOptions);


  return self.registration.showNotification(notificationTitle,notificationOptions); 
}  
	messaging.setBackgroundMessageHandler(showMessage);


 self.addEventListener('message', function (evt) {     
  showMessage( evt.data );
});
	/*function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
	
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon
    };
	
	

    return true; //self.registration.showNotification(notificationTitle,notificationOptions);
}*/
  }
  

self.addEventListener('notificationclick',function(evt){
	console.log("notification clicked",evt);
});




if (PWAConfigurtion) {
    console.log("pwa configuration loaded", PWAConfigurtion);
} else {
    console.log("pwa configuration load failed");
}

const staticCacheName = PWAConfigurtion.cacheName.staticCacheName;
const runtimeCacheName = PWAConfigurtion.cacheName.runtimeCacheName;

/*if (PWAConfigurtion.hasOwnProperty('preCacheArray')) {
    workbox.precaching.precacheAndRoute(PWAConfigurtion.preCacheArray);
}*/
//workbox.routing.registerRoute(new RegExp('.*.*'), new workbox.strategies.CacheFirst());

if (PWAConfigurtion.hasOwnProperty('runtimeCacheFiles')) {
    var regexFromConfiguration = '';
    //PWAConfigurtion.runtimeCacheFiles.forEach(createRegex);
    var regex = [];
    for (var i = 0; i < PWAConfigurtion.runtimeCacheFiles.length; i++) {
        var runtimeCacheFiles = PWAConfigurtion.runtimeCacheFiles[i];

        for (var j = 0; j < runtimeCacheFiles.excludedFiles.length; j++) {
            if (runtimeCacheFiles.excludedFiles[j].startsWith("/")) {
                runtimeCacheFiles.excludedFiles[j] = runtimeCacheFiles.folderPath + runtimeCacheFiles.excludedFiles[j];
            } else {
                runtimeCacheFiles.excludedFiles[j] = runtimeCacheFiles.folderPath + "/" + runtimeCacheFiles.excludedFiles[j];
            }
        }
        var excludedPaths = runtimeCacheFiles.excludedFiles.join("|");

        for (var k = 0; k < runtimeCacheFiles.includedFiles.length; k++) {
            if (runtimeCacheFiles.includedFiles[k].startsWith("/")) {
                runtimeCacheFiles.includedFiles[k] = runtimeCacheFiles.folderPath + runtimeCacheFiles.includedFiles[k];
            } else {
                runtimeCacheFiles.includedFiles[k] = runtimeCacheFiles.folderPath + "/" + runtimeCacheFiles.includedFiles[k];
            }
        }
        var includedPaths = runtimeCacheFiles.includedFiles.join("|");
        if (!!excludedPaths) {
            regex.push('^(' + excludedPaths + ')');
        }
        if (!!includedPaths) {
            regex.push(includedPaths);
        }
        if (runtimeCacheFiles.hasOwnProperty('cacheImagesLoaded') && runtimeCacheFiles.cacheImagesLoaded) {
            regex.push('/.*.jpg')
        }
    }
    regexFromConfiguration = regex.join("|");
    console.log("regexFromConfiguration", regexFromConfiguration);

    //workbox.routing.registerRoute(new RegExp('/style/.*.css|/pages/.*.html|/.*.(css|jpg)'), new workbox.strategies.CacheFirst());
    //workbox.routing.setCatchHandler(({event}) => {
    //return caches.match(PWAConfigurtion.preCacheArray[3]);
    //})
}

/*if(PWAConfigurtion.hasOwnProperty('enablePushNotification') && PWAConfigurtion.enablePushNotification){
	console.log('self object',self.registration.pushManager.subscribe());
}*/


if(PWAConfigurtion.hasOwnProperty('fcmNotificationRequired') && PWAConfigurtion.fcmNotificationRequired){
/*const firebaseConfig = {
  apiKey: "AIzaSyBtB3nk9k-AUuBQvcplmUbdwI13HIWZT6U",
  authDomain: "notification-test-25d1e.firebaseapp.com",
  databaseURL: "https://notification-test-25d1e.firebaseio.com",
  projectId: "notification-test-25d1e",
  storageBucket: "notification-test-25d1e.appspot.com",
  messagingSenderId: "827645719830",
  appId: "1:827645719830:web:955b36b22b04bebdb60c37"
};

firebase.initializeApp(firebaseConfig);
  if(firebase){
  // Initialize Firebase
	const messaging = firebase.messaging();
	console.log('messaging',messaging);

	
	messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
	
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
  }*/
}

/*function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
	 return caches.match('/offline/');
    // You could return a custom offline 404 page here
  });
}



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    }
  );
});

*/




/*self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ',  event.request.url.match(/\.^(jpe?g|png|gif|css)$/gi));
    //console.log('Fetch event for ',  event.request);

  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).then(response => {
  // TODO 5 - Respond with custom 404 page
  return caches.open(staticCacheName).then(cache => {
	  if(.test(event.request.url)){
		  cache.put(event.request.url, response.clone());
		  }
    return response;
  });
}).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});*/

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

self.addEventListener('install', function (e) {
    /*e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );*/
});

/*self.addEventListener('push', function(event) {
    console.log("push event", event);
    const promiseChain = self.registration.showNotification(event.data.text());

    event.waitUntil(promiseChain);
});*/

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
            return cache.addAll(PWAConfigurtion.preCacheArray);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request)
                .then(response => {
                    if (response.status === 404) {
                        return caches.match('pages/404.html');
                    }
                    return caches.open(runtimeCacheName)
                        .then(cache => {
                            if (event.request.url.match(new RegExp(regexFromConfiguration))) {
                                cache.put(event.request.url, response.clone());
                            } else {
                                console.log("no match in regex");
                            }
                            return response;
                        });
                });
        }).catch(error => {
            console.log('Error, ', error);
            return caches.match('pages/offline.html');
        })
    );
});

/*const showMessage = function(payload){
    console.log('showMessage', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        image: payload.notification.image,
        click_action: payload.notification.click_action,
        data:payload.notification.click_action
    };  


  return self.registration.showNotification(notificationTitle,notificationOptions); 
}*/

/*self.addEventListener('message', function (evt) {     
  showMessage( evt.data );
});*/

