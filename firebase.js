// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSXwH88Cu3TZwbY8Gywh9uZgUGbW20qq0",
  authDomain: "festivapp-2a105.firebaseapp.com",
  projectId: "festivapp-2a105",
  storageBucket: "festivapp-2a105.appspot.com",
  messagingSenderId: "1067846679354",
  appId: "1:1067846679354:web:a88063a3dbb7635b696e03",
  measurementId: "G-FWZZSQMQPL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export const auth = getAuth();

export { app, db, storage, };