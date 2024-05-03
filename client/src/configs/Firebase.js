// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD4V6SrIbhDYqYOzqpBxiYdR3Ya7rE7MFc",
  authDomain: "nonprofit-social-421415.firebaseapp.com",
  projectId: "nonprofit-social-421415",
  storageBucket: "nonprofit-social-421415.appspot.com",
  messagingSenderId: "1073226547247",
  appId: "1:1073226547247:web:e067808ec4994888e686da",
  measurementId: "G-NKP3K7CX70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// const provider  = new FacebookAuthProvider();
export const db = getFirestore(app);
// export {auth, provider}