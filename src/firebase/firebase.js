import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSlXrg2HabygufsUxbls-B00204Xy4a-Q",
  authDomain: "task-management-app-1cc7c.firebaseapp.com",
  projectId: "task-management-app-1cc7c",
  storageBucket: "task-management-app-1cc7c.appspot.com",
  messagingSenderId: "375299473953",
  appId: "1:375299473953:web:a4d559d55db2b87bdd9960",
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
