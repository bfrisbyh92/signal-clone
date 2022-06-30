import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: "AIzaSyCz3x0EvaqA_ywSnIH23QFC6GPdpRuhess",
  authDomain: "signal-6531d.firebaseapp.com",
  projectId: "signal-6531d",
  storageBucket: "signal-6531d.appspot.com",
  messagingSenderId: "157384369305",
  appId: "1:157384369305:web:f2b9fc727c1ac83be94408"
};

// // add firebase config
// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.apiKey,
//   authDomain: Constants.manifest.extra.authDomain,
//   projectId: Constants.manifest.extra.projectId,
//   storageBucket: Constants.manifest.extra.storageBucket,
//   messagingSenderId: Constants.manifest.extra.messagingSenderId,
//   appId: Constants.manifest.extra.appId,
// };
// ^^^ This is for later. Similiar to a dot env file in regular React? ^^^ Looked important enough to save

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app);

export { auth };