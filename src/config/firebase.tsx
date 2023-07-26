// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCtpSnornzOjLR6G04Fw5rtSIoGqRJ8KzQ",
  authDomain: "swp391-group7.firebaseapp.com",
  projectId: "swp391-group7",
  storageBucket: "swp391-group7.appspot.com",
  messagingSenderId: "676513542921",
  appId: "1:676513542921:web:55e3eb56ddcfacf35959d8",
  measurementId: "G-TT80SGE0MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const ggProvider = new GoogleAuthProvider();