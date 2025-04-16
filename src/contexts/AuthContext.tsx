'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  AuthProvider as FirebaseAuthProvider,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider, facebookProvider, twitterProvider } from '@/lib/firebase';
import { UserProfile, UserRole } from '@/lib/types';

// Auth context interface
interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  signUp: (email: string, password: string, role?: UserRole) => Promise<UserProfile>;
  signInWithGoogle: () => Promise<UserProfile>;
  signInWithGithub: () => Promise<UserProfile>;
  signInWithFacebook: () => Promise<UserProfile>;
  signInWithTwitter: () => Promise<UserProfile>;
  signOut: () => Promise<void>;
  updateUserRole: (uid: string, role: UserRole) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  initialized: false,
  signIn: async () => { throw new Error('Not implemented'); },
  signUp: async () => { throw new Error('Not implemented'); },
  signInWithGoogle: async () => { throw new Error('Not implemented'); },
  signInWithGithub: async () => { throw new Error('Not implemented'); },
  signInWithFacebook: async () => { throw new Error('Not implemented'); },
  signInWithTwitter: async () => { throw new Error('Not implemented'); },
  signOut: async () => { throw new Error('Not implemented'); },
  updateUserRole: async () => { throw new Error('Not implemented'); }
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (user: FirebaseUser) => {
    try {
      const profileRef = doc(db, 'userProfiles', user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        const profileData = profileSnap.data() as UserProfile;
        setProfile(profileData);
        return profileData;
      } else {
        console.log('No profile found for user', user.uid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Create a profile for a new user
  const createUserProfile = async (user: FirebaseUser, role: UserRole = UserRole.PLAYER) => {
    try {
      const timestamp = Date.now();
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: role,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      
      // Save to Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), newProfile);
      setProfile(newProfile);
      return newProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await fetchUserProfile(result.user);
      if (!userProfile) {
        // If no profile exists for some reason, create one with player role
        return await createUserProfile(result.user, UserRole.PLAYER);
      }
      return userProfile;
    } catch (error: any) {
      console.error('Sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, role: UserRole = UserRole.PLAYER) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return await createUserProfile(result.user, role);
    } catch (error: any) {
      console.error('Sign-up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Generic social sign-in handler
  const signInWithProvider = async (provider: FirebaseAuthProvider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if user profile exists, if not create one
      let userProfile = await fetchUserProfile(result.user);
      if (!userProfile) {
        userProfile = await createUserProfile(result.user);
      }
      return userProfile;
    } catch (error: any) {
      console.error('Social sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Social sign-in methods
  const signInWithGoogle = () => signInWithProvider(googleProvider);
  const signInWithGithub = () => signInWithProvider(githubProvider);
  const signInWithFacebook = () => signInWithProvider(facebookProvider);
  const signInWithTwitter = () => signInWithProvider(twitterProvider);

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  // Update user role
  const updateUserRole = async (uid: string, role: UserRole) => {
    try {
      const profileRef = doc(db, 'userProfiles', uid);
      await setDoc(profileRef, { 
        role, 
        updatedAt: Date.now() 
      }, { merge: true });
      
      // If updating the current user, update the local state
      if (user && user.uid === uid) {
        setProfile(prev => prev ? { ...prev, role } : null);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    // Set a timeout to ensure we don't get stuck in loading
    const timeoutId = setTimeout(() => {
      if (loading && !initialized) {
        console.log('Auth initialization timeout - forcing ready state');
        setLoading(false);
        setInitialized(true);
      }
    }, 5000); // 5 second timeout for auth initialization

    const unsubscribe = onAuthStateChanged(auth, 
      async (user) => {
        setUser(user);
        if (user) {
          try {
            await fetchUserProfile(user);
          } catch (error) {
            console.error('Error during profile fetch:', error);
            setAuthError(error instanceof Error ? error : new Error('Unknown error'));
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
        setInitialized(true);
      },
      (error) => {
        console.error('Auth state error:', error);
        setAuthError(error);
        setLoading(false);
        setInitialized(true);
      }
    );

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [loading]);

  // Log auth status
  useEffect(() => {
    if (initialized) {
      console.log('Auth initialized. User:', user ? 'Logged in' : 'Not logged in');
    }
  }, [user, initialized]);

  const value = {
    user,
    profile,
    loading,
    initialized,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter,
    signOut,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 