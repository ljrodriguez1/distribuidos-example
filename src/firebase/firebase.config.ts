import firebase from "firebase/compat";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import "firebase/auth";
import "firebase/analytics";

import Chat from "./types/chat";
console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const storage = firebase.storage();
const analytics = firebase.analytics;
if (process.env.LOCAL === "TRUE") {
  firestore.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099/");
  functions.useEmulator("localhost", 5001);
  storage.useEmulator("localhost", 9199);
}

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  firestore.collection(collectionPath).withConverter(converter<T>());

const db = {
  chat: dataPoint<Chat>("chat"),
};

export default firebase;
export { db, auth, functions, storage, analytics };
