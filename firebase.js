// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDkR45K82ZSUuWnvVdfBYqFCbPADebvs",
    authDomain: "signal-clone-mobile-app-1702e.firebaseapp.com",
    projectId: "signal-clone-mobile-app-1702e",
    storageBucket: "signal-clone-mobile-app-1702e.appspot.com",
    messagingSenderId: "458160026059",
    appId: "1:458160026059:web:26b8f14a6e844c2ca5064e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db }