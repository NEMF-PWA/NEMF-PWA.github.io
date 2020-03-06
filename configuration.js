var PWAConfigurtion = {
    cacheName: {
        "staticCacheName": "myAppStaticCache",
        "runtimeCacheName": "myAppRuntimeCache"
    },
    preCacheArray: [
        '/',
        '/index.html',
        'pages/offline.html',
        'pages/404.html'
    ],
    runtimeCacheFiles: [
	{
        "folderPath": "/css",
        "includedFiles": ["/.*.css"],
        "excludedFiles": []
    }, {
        "folderPath": "/pages",
        "includedFiles": ["/.*.css", "post1.html"],
        "excludedFiles": [
            "post2.html",
            "post3.html"
        ],
        "cacheImagesLoaded": true
    }],
	enablePushNotification:true,
	applictionServerPublicKey : "BEbXWzdWqkgklIezwpMt5q4l_ru1mopNuDQKVNm1kp9pce8dhCiWNxZWUNV7VnL2mHudTnr4he_ipzE3vKteWW0",
	fcmNotificationRequired:true
}