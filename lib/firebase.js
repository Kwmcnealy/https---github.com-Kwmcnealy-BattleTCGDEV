import { initializeApp, getApps } from "firebase/app";
// Import other Firebase services you need, e.g., getAuth, getFirestore
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

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
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Initialize Analytics if running in browser
  // if (typeof window !== "undefined") {
  //   getAnalytics(app);
  // }
} else {
  app = getApps()[0]; // If already initialized, use that instance
}

// Export the initialized app and other services you might need
// export const auth = getAuth(app);
// export const db = getFirestore(app);
export { app }; 