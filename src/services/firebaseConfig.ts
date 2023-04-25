import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDCR5N_kXQFjwy6V8hRjLN6tIEub11FwoI",
  authDomain: "shopping-cart-ab943.firebaseapp.com",
  projectId: "shopping-cart-ab943",
  storageBucket: "shopping-cart-ab943.appspot.com",
  messagingSenderId: "111258993793",
  appId: "1:111258993793:web:c9270d1fcf73fe80dc7980",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
