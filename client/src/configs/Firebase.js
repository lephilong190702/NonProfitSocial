// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

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
// const analytics = getAnalytics(app);
// const provider  = new FacebookAuthProvider();
export const db = getFirestore(app);
// export {auth, provider}