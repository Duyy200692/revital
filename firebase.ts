import * as FirebaseApp from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase project configuration obtained from the Firebase console.
 * This object contains the necessary keys to connect the web app to Firebase services.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAORIHoE0rVltYGX_ya0V1SYefgo5jJrf8",
  authDomain: "revital-e75fd.firebaseapp.com",
  projectId: "revital-e75fd",
  storageBucket: "revital-e75fd.firebasestorage.app",
  messagingSenderId: "744776004260",
  appId: "1:744776004260:web:a3ebb98702367f66ceec31"
};

/**
 * DO: Initialize Firebase using the singleton pattern.
 * This prevents multiple initializations of the same app instance.
 * Using a namespace import to handle potential type resolution issues where named exports are not detected.
 */
const app = FirebaseApp.getApps().length > 0 
  ? FirebaseApp.getApp() 
  : FirebaseApp.initializeApp(firebaseConfig);

/**
 * DO: Export the Firestore database instance.
 * This instance is used throughout the application to interact with the database.
 */
export const db = getFirestore(app);
