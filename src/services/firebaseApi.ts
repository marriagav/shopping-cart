import { FirebaseApp } from "firebase/app";
import { firebaseApp, auth, db } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  writeBatch,
  doc,
  Firestore,
} from "firebase/firestore/lite";

class FirebaseApi {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;

  constructor(firebaseApp: FirebaseApp, auth: Auth, db: Firestore) {
    if (!firebaseApp) {
      throw new Error("FirebaseApp is null or undefined.");
    }
    this.app = firebaseApp;
    this.auth = auth;
    this.db = db;
  }

  async signInWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      this.auth.useDeviceLanguage();
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (e: any) {
      console.error("Failed to sign in with Google:", e);
      throw e;
    }
  }

  async signOutUser(): Promise<any> {
    try {
      await signOut(this.auth);
      return true;
    } catch (e: any) {
      console.error("Failed to sign out user:", e);
      throw e;
    }
  }

  isUserSignedIn() {
    return !!this.auth.currentUser;
  }

  async addCartItem(item: item): Promise<any> {
    try {
      const collectionPath = `cart/${this.auth.currentUser?.uid}/items`;
      const cartCollection = collection(this.db, collectionPath);
      const result = await addDoc(cartCollection, item);
      return result;
    } catch (e: any) {
      console.error("Failed to add item to cart:", e);
      throw e;
    }
  }

  async saveCart(cart: Map<item, number>, deletedItems: item[]): Promise<any> {
    try {
      const collectionPath = `cart/${this.auth.currentUser?.uid}/items`;
      const batch = writeBatch(this.db);
      cart.forEach((value: number, key: item) => {
        const docRef = doc(this.db, collectionPath, key.id.toString());
        const itemWithCount = { ...key, count: value };
        batch.set(docRef, itemWithCount);
      });
      deletedItems.forEach((item) => {
        const docRef = doc(this.db, collectionPath, item.id.toString());
        batch.delete(docRef);
      });
      await batch.commit();
      return true;
    } catch (e: any) {
      console.error("Failed to save cart:", e);
      throw e;
    }
  }

  async loadCart(): Promise<Map<item, number> | null> {
    try {
      const collectionPath = `cart/${this.auth.currentUser?.uid}/items`;
      const cartCollection = collection(this.db, collectionPath);
      const cartSnapshot = await getDocs(cartCollection);
      const cartMap = new Map<item, number>();
      cartSnapshot.forEach((doc) => {
        const item = doc.data() as any;
        cartMap.set(item, item.count);
      });
      return cartMap;
    } catch (e: any) {
      console.error("Failed to load cart:", e);
      throw e;
    }
  }

  onAuthStateChanged(callback: (user: any) => void) {
    try {
      onAuthStateChanged(this.auth, callback);
    } catch (e) {
      console.error("Failed to subscribe to auth state changes:", e);
      throw e;
    }
  }
}

const firebaseApi = new FirebaseApi(firebaseApp, auth, db);
export default firebaseApi;
