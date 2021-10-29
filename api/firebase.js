import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBFuuz0ojxgW7lVkcnDK_dHJtk8iTTcMCo",
    authDomain: "studjobs-20f3c.firebaseapp.com",
    projectId: "studjobs-20f3c",
    storageBucket: "studjobs-20f3c.appspot.com",
    messagingSenderId: "780003100836",
    appId: "1:780003100836:web:370476040c6ee399c57e31",
    measurementId: "G-K6JW10K36L"
};

// Initialize Firebase
if (!firebase.apps.length)
    const app = firebase.initializeApp(firebaseConfig);

export { firebase }