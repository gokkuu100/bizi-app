// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjZA6ljoUTXI14Le5ZfemkykfGgn0O2JY",
  authDomain: "react-auth-a0c74.firebaseapp.com",
  projectId: "react-auth-a0c74",
  storageBucket: "react-auth-a0c74.appspot.com",
  messagingSenderId: "525837744818",
  appId: "1:525837744818:web:b1cfb5d2edb204c6f0a7ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app)