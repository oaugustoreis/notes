// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQTUvD6hu9eb0x4RpfcsCEGl7iKh58j_A",
  authDomain: "notes-354da.firebaseapp.com",
  projectId: "notes-354da",
  storageBucket: "notes-354da.firebasestorage.app",
  messagingSenderId: "1059945160926",
  appId: "1:1059945160926:web:01b4f2f1a29106418a224f",
  measurementId: "G-HHKC589PG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app)
const auth = getAuth(app)

export { fireStore, auth }