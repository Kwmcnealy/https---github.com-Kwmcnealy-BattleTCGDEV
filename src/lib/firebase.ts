'use client';

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  Auth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  FacebookAuthProvider,
  TwitterAuthProvider
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  // Initialize Analytics if running in browser
  // if (typeof window !== "undefined") {
  //   getAnalytics(firebaseApp);
  // }
} else {
  firebaseApp = getApps()[0]; // If already initialized, use that instance
}

// Initialize services
const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore(firebaseApp);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Configure providers
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Export services and providers
export { 
  firebaseApp, 
  auth, 
  db,
  googleProvider,
  githubProvider,
  facebookProvider,
  twitterProvider
}; 