import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: "code-reactions-50062.firebaseapp.com",
  projectId: "code-reactions-50062",
  storageBucket: "code-reactions-50062.appspot.com",
  messagingSenderId: "152846030819",
  appId: process.env.REACT_APP_FIRESTORE_API_ID,
  measurementId: "G-ZL1PX47C0Y",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
