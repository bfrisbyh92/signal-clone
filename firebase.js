import { initializeApp, getApps } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// import { firebaseConfig } from './firebaseVariables'

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
// import { getDoc } from 'firebase/firestore'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyCz3x0EvaqA_ywSnIH23QFC6GPdpRuhess",
//   authDomain: "signal-6531d.firebaseapp.com",
//   projectId: "signal-6531d",
//   storageBucket: "signal-6531d.appspot.com",
//   messagingSenderId: "157384369305",
//   appId: "1:157384369305:web:f2b9fc727c1ac83be94408"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDC5L1TiSG9gOWJGZk4Uahaubxu6KrJR9s",
  authDomain: "signal-clone-e3d92.firebaseapp.com",
  projectId: "signal-clone-e3d92",
  storageBucket: "signal-clone-e3d92.appspot.com",
  messagingSenderId: "771049167636",
  appId: "1:771049167636:web:62427dcd6bde326201c001"
}

if (!getApps().length) initializeApp(firebaseConfig)
// ^^^ Only want to initialize app once, improve performance. ^^^
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export {
  storage,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  db,
  auth,
}