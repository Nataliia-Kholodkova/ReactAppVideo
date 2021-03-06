import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_UTL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const firebaseAuth = getAuth(app);
const firebaseFirestore = getFirestore(app);

export {
  app,
  firebaseAuth,
  firebaseFirestore,
};
