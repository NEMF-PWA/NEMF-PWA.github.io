window.onload = () => {
    'use strict';

    console.log("window  onload",PWAConfigurtion);
    $('#pushBtn').click(function(event) {
        initFirebaseMessagingRegistration();
		
		/*const notificationTitle = payload.notification.title;
		const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,        
		};
		navigator.serviceWorker.ready.then(registration => {
			registration.showNotification(title, options);
		});*/
    });
}

function initFirebaseMessagingRegistration() {

    firebase.initializeApp({
        apiKey: "AIzaSyBtB3nk9k-AUuBQvcplmUbdwI13HIWZT6U",
        authDomain: "notification-test-25d1e.firebaseapp.com",
        databaseURL: "https://notification-test-25d1e.firebaseio.com",
        projectId: "notification-test-25d1e",
        storageBucket: "notification-test-25d1e.appspot.com",
        messagingSenderId: "827645719830",
        appId: "1:827645719830:web:955b36b22b04bebdb60c37"
    });
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BEbXWzdWqkgklIezwpMt5q4l_ru1mopNuDQKVNm1kp9pce8dhCiWNxZWUNV7VnL2mHudTnr4he_ipzE3vKteWW0");
    messaging
        .requestPermission()
        .then(function() {
            console.log("Got notification permission");
            return messaging.getToken();
        })
        .then(function(token) {
            // print the token on the HTML page
            console.log("Token is ", token);
        })
        .catch(function(err) {
            console.log("Didn't get notification permission", err);
        });

    messaging.onMessage(function(payload) {
		/*const notificationTitle = payload.notification.title;
		const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,        
		};*/
		navigator.serviceWorker.ready.then(function(registration){
			registration.active.postMessage(payload);
		});
		
        console.log("Message received. ", JSON.stringify(payload));
    });
    messaging.onTokenRefresh(function() {
        messaging.getToken()
            .then(function(refreshedToken) {
                console.log('Token refreshed.');
            }).catch(function(err) {
                console.log('Unable to retrieve refreshed token ', err);
            });
    });
}