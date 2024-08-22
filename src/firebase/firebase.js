import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSlXrg2HabygufsUxbls-B00204Xy4a-Q",
  authDomain: "task-management-app-1cc7c.firebaseapp.com",
  projectId: "task-management-app-1cc7c",
  storageBucket: "task-management-app-1cc7c.appspot.com",
  messagingSenderId: "375299473953",
  appId: "1:375299473953:web:a4d559d55db2b87bdd9960",
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
