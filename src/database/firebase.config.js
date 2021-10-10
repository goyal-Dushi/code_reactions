import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: "code-reactions-50062.firebaseapp.com",
  projectId: "code-reactions-50062",
  storageBucket: "code-reactions-50062.appspot.com",
  messagingSenderId: "152846030819",
  appId: process.env.REACT_APP_FIRESTORE_API_ID,
  measurementId: "G-ZVYECCFS9N",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
