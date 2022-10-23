/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');


/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebaseConfig = {
    apiKey: "AIzaSyDKLJxu5RQ16isf5W3wR80x8pFgbxOwnqA",
    authDomain: "crm-fcm.firebaseapp.com",
    projectId: "crm-fcm",
    storageBucket: "crm-fcm.appspot.com",
    messagingSenderId: "736020433172",
    appId: "1:736020433172:web:f9dec371d6f54638a1da01",
    measurementId: "G-MBS34JHT8F"
  };


 // firebase.initializeApp(firebaseConfig);
/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload,
//   );
//   /* Customize notification here */
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/itwonders-web-logo.png",
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions,
//   );
// });
