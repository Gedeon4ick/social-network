import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNHOwcxwfrGUJWw8ompyqsN3F7mTE1ytw",
    authDomain: "whats-app-clone-67280.firebaseapp.com",
    projectId: "whats-app-clone-67280",
    storageBucket: "whats-app-clone-67280.appspot.com",
    messagingSenderId: "776940211664",
    appId: "1:776940211664:web:0d1facdc5193b4cb45bdd5",
    measurementId: "G-4WFB99QCX6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export {auth, provider};
export default db;