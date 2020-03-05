console.log('main js loaded.');
$(document).ready(function(){
			$('#init').click(function(event){
				console.log('event',event);
				initFirebaseMessagingRegistration()
			});
		});
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

function initFirebaseMessagingRegistration() {
            messaging
                .requestPermission()
                .then(function () {
                    //messageElement.innerHTML = "Got notification permission";
                    console.log("Got notification permission");
                    return messaging.getToken();
                })
                .then(function (token) {
                    // print the token on the HTML page
                    //tokenElement.innerHTML = "Token is " + token;
					console.log("Token is " , token);
                })
                .catch(function (err) {
                    //errorElement.innerHTML = "Error: " + err;
                    console.log("Didn't get notification permission", err);
                });
        }
		
		messaging.onMessage(function (payload) {
            console.log("Message received. ", JSON.stringify(payload));
            //notificationElement.innerHTML = notificationElement.innerHTML + " " + payload.data.notification;
        });
		 messaging.onTokenRefresh(function () {
            messaging.getToken()
                .then(function (refreshedToken) {
                    console.log('Token refreshed.');
                    //tokenElement.innerHTML = "Token is " + refreshedToken;
                }).catch(function (err) {
                    //errorElement.innerHTML = "Error: " + err;
                    console.log('Unable to retrieve refreshed token ', err);
                });
        });
		