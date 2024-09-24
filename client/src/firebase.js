// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "mern-estate-c7f36.firebaseapp.com",
  projectId: "mern-estate-c7f36",
  storageBucket: "mern-estate-c7f36.appspot.com",
  messagingSenderId: "955679828043",
  appId: "1:955679828043:web:fc79b5c51cfcb01874c5ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);