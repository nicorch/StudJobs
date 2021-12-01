import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCBfxeytQhaMOe1fJohgsIDIaJZLoBBlQM",
    authDomain: "high-magpie-332514.firebaseapp.com",
    databaseURL: "https://high-magpie-332514-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "high-magpie-332514",
    storageBucket: "high-magpie-332514.appspot.com",
    messagingSenderId: "693528566251",
    appId: "1:693528566251:web:cf8799a9e4737064a461ae"
};

// Initialize Firebase

if (getApps().length === 0) {
    var app = initializeApp(firebaseConfig)
}

const auth = getAuth(app)

export default { auth }