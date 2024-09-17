import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCqfqN_ovjXavbbXGq2FvNiXxCXhZQq-Co",
  authDomain: "my-first-project-97a20.firebaseapp.com",
  projectId: "my-first-project-97a20",
  storageBucket: "my-first-project-97a20.appspot.com",
  messagingSenderId: "865046261",
  appId: "1:865046261:web:e6df2508d0fec3e9953fbc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db,storage };
