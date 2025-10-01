// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase (celle que tu as copiée)
const firebaseConfig = {
  apiKey: "AIzaSyBh1O1Yj4SgUpZaIYbJdfNYn-Etk0CEDdM",
  authDomain: "todo-collab-d0964.firebaseapp.com",
  projectId: "todo-collab-d0964",
  storageBucket: "todo-collab-d0964.firebasestorage.app",
  messagingSenderId: "1071082263759",
  appId: "1:1071082263759:web:08a7bdd1db684c684153ba",
  measurementId: "G-48TNTV5WKC"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase qu'on utilise
export const auth = getAuth(app);         // Authentification
export const db = getFirestore(app);      // Firestore
