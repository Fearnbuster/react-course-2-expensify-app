
import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

firestore.settings({
  timestampsInSnapshots: true
});

export { firebase, googleAuthProvider, firestore as default };

