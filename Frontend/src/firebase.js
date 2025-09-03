// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcCd1517wu4TFciharugS3VFgVxV3hvNA",
  authDomain: "code-debugger-50319.firebaseapp.com",
  projectId: "code-debugger-50319",
  storageBucket: "code-debugger-50319.firebasestorage.app",
  messagingSenderId: "166322379939",
  appId: "1:166322379939:web:07fcdd3e2eb49f673ab316",
  measurementId: "G-VTBLRFJ9LZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();