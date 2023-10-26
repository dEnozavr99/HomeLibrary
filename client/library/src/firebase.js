// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnyiPSn4SwLkb1slVIQE3J86U7UW2_7Yg",
  authDomain: "mylibrary-e2baf.firebaseapp.com",
  projectId: "mylibrary-e2baf",
  storageBucket: "mylibrary-e2baf.appspot.com",
  messagingSenderId: "54908988853",
  appId: "1:54908988853:web:878c6aa5bdc43da4eebdfc",
  measurementId: "G-9CY7BSCMMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;