import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAH_X09VuLhbv7JNT_0uhGOGcZtjdGHLdg",
  authDomain: "mydb-75088.firebaseapp.com",
  projectId: "mydb-75088",
  storageBucket: "mydb-75088.firebasestorage.app",
  messagingSenderId: "697966027847",
  appId: "1:697966027847:web:816e097682b63e4a083d62",
  measurementId: "G-YC4JBNGGMN"
};



const app = initializeApp(firebaseConfig);

//firestore
export const db = getFirestore(app);

//auth
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

//storage
export const storage = getStorage(app)