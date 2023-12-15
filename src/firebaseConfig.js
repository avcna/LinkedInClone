// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFbOwTzx_rjh7Ck_ZvFg0m0hcBEkSdNwI",
  authDomain: "linkedin-4bd23.firebaseapp.com",
  projectId: "linkedin-4bd23",
  storageBucket: "linkedin-4bd23.appspot.com",
  messagingSenderId: "825573278161",
  appId: "1:825573278161:web:21dcae5236f9100f7c60f0",
  measurementId: "G-LZZ3BLJKQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, auth, firestore, storage };
