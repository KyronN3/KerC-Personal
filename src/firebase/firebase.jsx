import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyB32cEnqGQiiDvsu9KyWfnnVYYQLI9Jit4",

  authDomain: "ker-c-29f8d.firebaseapp.com",

  projectId: "ker-c-29f8d",

  storageBucket: "ker-c-29f8d.firebasestorage.app",

  messagingSenderId: "841240957083",

  appId: "1:841240957083:web:cbb7b6f08b742233def63e",

  measurementId: "G-M986WWLMC3"

};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);