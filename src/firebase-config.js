import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1KMEA7KMQk_h3KlJMPunem6Y0XGs1oxU",
  authDomain: "sharediary-f808e.firebaseapp.com",
  projectId: "sharediary-f808e",
  storageBucket: "sharediary-f808e.appspot.com",
  messagingSenderId: "984672458400",
  appId: "1:984672458400:web:6ea44c760a5a5df90ddbc5",
  measurementId: "G-GJ9FKF6LF8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);