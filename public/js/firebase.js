import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmps2xc43FVStBEYe1ghS-t-bO9GII1XA",
  authDomain: "cougarzone-d6be4.firebaseapp.com",
  projectId: "cougarzone-d6be4",
  storageBucket: "cougarzone-d6be4.firebasestorage.app",
  messagingSenderId: "359665792907",
  appId: "1:359665792907:web:89b54508f29262855fa18e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
