import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLaQ4jrXs-UdG6tLC0nT80KBexSKabVEc",
  authDomain: "college-inventory-app.firebaseapp.com",
  projectId: "college-inventory-app",
  storageBucket: "college-inventory-app.appspot.com",
  messagingSenderId: "903671835801",
  appId: "1:903671835801:web:8c3d59e2b2b97322031c08",
  measurementId: "G-VX06CCMM25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
