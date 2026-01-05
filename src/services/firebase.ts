// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfyiCeKwcUp3Wo3khZA6NK3VeYmChcT2E",
  authDomain: "adminflow-6823b.firebaseapp.com",
  projectId: "adminflow-6823b",
  storageBucket: "adminflow-6823b.firebasestorage.app",
  messagingSenderId: "988108549746",
  appId: "1:988108549746:web:e877f6d85d15b518d9dceb",
  measurementId: "G-EWM0YP4JWG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
