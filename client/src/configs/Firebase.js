// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyHXrYZgoMuB-vTHRUWVcI_anOUXP806E",
  authDomain: "nonprofit-social-network.firebaseapp.com",
  projectId: "nonprofit-social-network",
  storageBucket: "nonprofit-social-network.appspot.com",
  messagingSenderId: "181736501806",
  appId: "1:181736501806:web:44a6392a9638859052e5bf",
  measurementId: "G-MSF2PH0Q9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);