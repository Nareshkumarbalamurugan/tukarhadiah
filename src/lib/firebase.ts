// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcS0R6ypydE-BgPrPFWkp5KVMXLDZJQVg",
  authDomain: "tukarhadiah-42ee0.firebaseapp.com",
  projectId: "tukarhadiah-42ee0",
  storageBucket: "tukarhadiah-42ee0.firebasestorage.app",
  messagingSenderId: "592902627823",
  appId: "1:592902627823:web:31dca09543245d2a6dd61a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
