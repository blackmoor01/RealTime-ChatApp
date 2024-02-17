import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCdJkgma1j4LGeH5H8JMURuS6c89f7OYMA",
    authDomain: "realtime-chatapp-e2563.firebaseapp.com",
    projectId: "realtime-chatapp-e2563",
    storageBucket: "realtime-chatapp-e2563.appspot.com",
    messagingSenderId: "424955504525",
    appId: "1:424955504525:web:e5d71da5d5a3c3018d3fc4"
};

const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export {app, firestoreDB, firebaseAuth}