// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPLB0wLcYmfOppo6nCEgZ_vibBs04bh7g",
  authDomain: "ahyunyouth-2698c.firebaseapp.com",
  projectId: "ahyunyouth-2698c",
  storageBucket: "ahyunyouth-2698c.appspot.com",
  messagingSenderId: "824872691724",
  appId: "1:824872691724:web:dbe9d92a06b5cad0682629",
  measurementId: "G-FZRMT0BZWC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
