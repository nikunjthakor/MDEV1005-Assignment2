// Import the functions from the SDKsS
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZPjiVqdJMBpE9tkRCc9T4TEuI05XDEpk",
  authDomain: "mdev1005-assignment2-9145a.firebaseapp.com",
  projectId: "mdev1005-assignment2-9145a",
  storageBucket: "mdev1005-assignment2-9145a.appspot.com",
  messagingSenderId: "497035868260",
  appId: "1:497035868260:web:c2baf83cf4a2a345104771"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
