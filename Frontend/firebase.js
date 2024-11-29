// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMaSt3JqJLYbYSSHk7HdQEAhlhjGhiHbw",
  authDomain: "michile-a7632.firebaseapp.com",
  projectId: "michile-a7632",
  storageBucket: "michile-a7632.firebasestorage.app",
  messagingSenderId: "275205640299",
  appId: "1:275205640299:web:d41422c26d724c3afb212e",
  measurementId: "G-THBYF5EYDY"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
