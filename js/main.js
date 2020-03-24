window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js').then(function(registration) {

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
                        $('#notificationToken').text(token);

            $("#sendNotiBtn").removeAttr("disabled");


                        messaging.onMessage(function(payload) {
                            /*const notificationTitle = payload.notification.title;
		const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,        
		};*/
                            /*setTimeout(() => {
                            navigator.serviceWorker.ready.then(function(registration){
                            	registration.active.postMessage(payload);
                            }, 100);
                            });*/

                            console.log("Message received. ", registration);
                            console.log("Message received. ", registration.active);
                            registration.active.postMessage(payload);
                            //registration.controller.postMessage(payload);
                            console.log("Message received. ", JSON.stringify(payload));
                        });
                    })
                    .catch(function(err) {
                        console.log("Didn't get notification permission", err);
                    });

                messaging.onTokenRefresh(function() {
                    messaging.getToken()
                        .then(function(refreshedToken) {
                            console.log('Token refreshed.');
                        }).catch(function(err) {
                            console.log('Unable to retrieve refreshed token ', err);
                        });
                });
            });
    }

    $("#loginBtn").click($.proxy(function(event) {
        if ($('#username').val() == '') {
            tempHTML = "<label  class='errorLabel error-alert error-alert-login'>Username cannot be blank</label>";
            $('#username').after(tempHTML);
        }


        if ($('#password').val() == '') {
            tempHTML = "<label class='errorLabel error-alert error-alert-login' >Password cannot be blank</label>";
            $('#password').after(tempHTML);
        }

        if ($('#username').val() != '' && $('#password').val() != '') {
            window.open('/pages/post1.html', "_self");
            //       $('#loginDiv').hide();
            //     $('#dashboardDiv').show();
            //   $('#welcomeMessage').append($('#username').val());
        }
    }));

            $("#sendNotiBtn").attr("disabled", "disabled");

    $('#sendNotiBtn').click(function() {
        var notificationData = {};
		var title = $("#notiTitle").val();
		var body = $("#notiBody").val();
		var notilink = $("#notiLink").val();
		var token = $("#fcmToken").val();
	
if(title == ''){
	title = "You forgot to give the title.";
}	
if(body == ''){
	body = "You forgot to give the body.";
}	
if(notilink == ''){
	notilink = "https://www.google.com";
}	
		var notification = {};
		notification.title = title;
		notification.body = body;
		notification.click_action = notilink;
		
		
		notificationData.to = token;
		notificationData.notification = notification;

/*		{
	"to" : "czvjR63xIIaAVZN8qp_VrQ:APA91bEi35pGOh1zupAOgcJrm_mAGOVgrnGxAtaOautfsOdQhxJuFCDh26ElQxjcJ8g0VcEqQcOtr-TrS5gKpOcDczyexB0c1UeKAVAWdL_pe0NSykwuJjRre1jQHc6_FfuhAqyn_m5-",
    "notification": {
      "title": "FCM Message",
      "body": "This is a message from FCM",
      "click_action":"https://nemf-pwa.github.io/"
    },
    "data":{
    	"key":"is this"
    },
    "webpush": {
      "fcm_options":{
		"link": "https://nemf-pwa.github.io/pages/post1.html"
      }
    }
}*/	
		
		$.ajax({
			headers: {
				"Authorization":"key=AAAAwLOHdRY:APA91bHfIwMTlLb6RFd2y5cz9-wSBUWUUkusfXVMibuXZcPJVNydeGSU9xWp4pqkvV1Y_ioP-nvdeM1ikeMraZzmx723AeFdndTUBw4fTtP5L_PZ3Xbi1RZKjeE5gbdEcMerIOLS9g2I",
			},
			contentType:"application/json",
            url: "https://fcm.googleapis.com/fcm/send",
            data: JSON.stringify(notificationData),
            type: "POST",
            dataType: "json",
            success: function(apiResponse) {
				console.log("success",apiResponse);
			},
            error: function(xhr, textStatus, errorThrown) {
				console.log("error thrown",errorThrown);
            },
            complete: function(xhr, status) {
				console.log("completed",status);
            }
        });
    });


}