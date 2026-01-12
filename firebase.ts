
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAORIHoE0rVltYGX_ya0V1SYefgo5jJrf8",
  authDomain: "revital-e75fd.firebaseapp.com",
  projectId: "revital-e75fd",
  storageBucket: "revital-e75fd.firebasestorage.app",
  messagingSenderId: "744776004260",
  appId: "1:744776004260:web:a3ebb98702367f66ceec31"
};

// Đảm bảo app được khởi tạo đúng một lần duy nhất
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Khởi tạo Firestore từ app đã xác nhận
export const db = getFirestore(app);
