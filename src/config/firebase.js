import firebase from 'firebase';

var firebaseConfig = {
            apiKey: "AIzaSyDKLJxu5RQ16isf5W3wR80x8pFgbxOwnqA",
            authDomain: "crm-fcm.firebaseapp.com",
            projectId: "crm-fcm",
            storageBucket: "crm-fcm.appspot.com",
            messagingSenderId: "736020433172",
            appId: "1:736020433172:web:f9dec371d6f54638a1da01",
            //measurementId: "G-MBS34JHT8F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
