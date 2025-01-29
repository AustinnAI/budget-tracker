import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1w13XZFXNg4T0qBTxWoY9MoYX9QW1A8w",
    authDomain: "budget-tracker-f0517.firebaseapp.com",
    projectId: "budget-tracker-f0517",
    storageBucket: "budget-tracker-f0517.appspot.com",
    messagingSenderId: "186609217083",
    appId: "1:186609217083:web:0afe89e16e233dfaf4361e",
    measurementId: "G-WRW77L9MD9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);






console.log("Firebase Initialized:", app.name);
export { app, db, auth };
