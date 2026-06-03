// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0wwpybOL0PfU9olEPR2o9PRdDHyFgijQ",
  authDomain: "summarist-website-22a26.firebaseapp.com",
  projectId: "summarist-website-22a26",
  storageBucket: "summarist-website-22a26.firebasestorage.app",
  messagingSenderId: "504785657299",
  appId: "1:504785657299:web:2cedc9c8ef4433fc0e6326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()