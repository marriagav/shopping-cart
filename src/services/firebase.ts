import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  writeBatch,
  doc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCR5N_kXQFjwy6V8hRjLN6tIEub11FwoI",
  authDomain: "shopping-cart-ab943.firebaseapp.com",
  projectId: "shopping-cart-ab943",
  storageBucket: "shopping-cart-ab943.appspot.com",
  messagingSenderId: "111258993793",
  appId: "1:111258993793:web:c9270d1fcf73fe80dc7980",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

async function signInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();
  await signInWithPopup(auth, provider);
}

function signOutUser() {
  signOut(auth);
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!auth.currentUser;
}

// Returns the signed-in user's profile Pic URL.
async function getProfilePicUrl() {
  return (
    auth.currentUser?.photoURL || "../assets/images/profile_placeholder.png"
  );
}

function getProfileName() {
  return auth.currentUser?.displayName || "No Name";
}

const addCartItem = async (item: item) => {
  //each user has a cart collection
  const collectionPath = `cart/${auth.currentUser?.uid}/items`;
  const cartCollection = collection(db, collectionPath);
  await addDoc(cartCollection, item);
};

const saveCart = async (cart: Map<item, number>, deletedItems: item[]) => {
  const collectionPath = `cart/${auth.currentUser?.uid}/items`;
  const batch = writeBatch(db);
  cart.forEach((value: number, key: item) => {
    const docRef = doc(db, collectionPath, key.id.toString());
    const itemWithCount = { ...key, count: value };
    batch.set(docRef, itemWithCount);
  });
  deletedItems.forEach((item) => {
    const docRef = doc(db, collectionPath, item.id.toString());
    batch.delete(docRef);
  });
  await batch.commit();
};

const loadCart = async () => {
  const collectionPath = `cart/${auth.currentUser?.uid}/items`;
  const cartCollection = collection(db, collectionPath);
  const cartSnapshot = await getDocs(cartCollection);
  const cartMap = new Map<item, number>();
  cartSnapshot.forEach((doc) => {
    const item = doc.data() as any;
    cartMap.set(item, item.count);
  });
  return cartMap;
};

export {
  signInWithGoogle,
  signOutUser,
  isUserSignedIn,
  addCartItem,
  getProfilePicUrl,
  getProfileName,
  auth,
  saveCart,
  loadCart,
};
