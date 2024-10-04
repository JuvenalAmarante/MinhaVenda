import firebaseCredentials from './firebase-credentials.json';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: firebaseCredentials.apiKey,
  authDomain: firebaseCredentials.authDomain,
  projectId: firebaseCredentials.projectId,
  storageBucket: firebaseCredentials.storageBucket,
  messagingSenderId: firebaseCredentials.messagingSenderId,
  appId: firebaseCredentials.appId,
  measurementId: firebaseCredentials.measurementId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)