
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAORIHoE0rVltYGX_ya0V1SYefgo5jJrf8",
  authDomain: "revital-e75fd.firebaseapp.com",
  projectId: "revital-e75fd",
  storageBucket: "revital-e75fd.firebasestorage.app",
  messagingSenderId: "744776004260",
  appId: "1:744776004260:web:a3ebb98702367f66ceec31"
};

// Khởi tạo Firebase App (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Xuất Firestore instance
export const db = getFirestore(app);
