// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9iO6XuAyz12345abcdeXyz", 
  authDomain: "twentyfour.firebaseapp.com",
  projectId: "twentyfour",
  storageBucket: "twentyfour.appspot.com",
  messagingSenderId: "1091739999999",
  appId: "1:1091739999999:web:abcdefghijklm"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
