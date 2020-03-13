importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js')
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
	messaging.setBackgroundMessageHandler(showMessage);
  }
  
  self.addEventListener('message', function (evt) {     
  showMessage( evt.data );
});

const showMessage = function(payload){
    console.log('showMessage', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        click_action: payload.data.click_action,
        data:payload.data.click_action
    };  


  return self.registration.showNotification(notificationTitle,notificationOptions); 
}  