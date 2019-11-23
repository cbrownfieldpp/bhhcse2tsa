import ArrayUtil from './lib/ArrayUtil';
import NoteService from './lib/NoteService';
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADw9PQkFP60zMgjPr_kGCv15WH99y82xw",
    authDomain: "bhhc-se2-tsa.firebaseapp.com",
    databaseURL: "https://bhhc-se2-tsa.firebaseio.com",
    projectId: "bhhc-se2-tsa",
    storageBucket: "bhhc-se2-tsa.appspot.com",
    messagingSenderId: "878761180183",
    appId: "1:878761180183:web:a0bd36f849e2c8338c7052",
    measurementId: "G-L2ZPB0YCH7"
};


function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}

function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.getAuthResponse().id_token);
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        } else {
            console.log('User already signed-in Firebase.');
        }
    });
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);;

var db = firebase.firestore();
db.collection('notes').get().then((snapshot: any) => {
    snapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
    });
});

var provider = new firebase.auth.GoogleAuthProvider();
if (!firebase.auth().currentUser) {
    // firebase.auth().signInWithRedirect(provider);
} else {
    console.log(firebase.auth().currentUser);
}

const noteService = new NoteService(db)
console.log(ArrayUtil.randomSubset([{
    a: 'a'
}, {
    b: 'b'
}, {
    c: 'c'
}], 2));
console.log("Continuous integration is working!");