import admin from 'firebase-admin';

// Check if Firebase admin has been initialized
const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL, 
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  : admin.app();

// Get Firestore instance
const adminDb = firebaseAdmin.firestore();

// Get Auth instance
const adminAuth = firebaseAdmin.auth();

export { firebaseAdmin, adminDb, adminAuth }; 