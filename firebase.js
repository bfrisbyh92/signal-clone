import { initializeApp, getApps } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAHFen-w12C6LwbK7wiZXZY5-f86dNiO44",
  authDomain: "signal3-45484.firebaseapp.com",
  projectId: "signal3-45484",
  storageBucket: "signal3-45484.appspot.com",
  messagingSenderId: "782950195799",
  appId: "1:782950195799:web:3da5209dd30154f632f912"
};

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