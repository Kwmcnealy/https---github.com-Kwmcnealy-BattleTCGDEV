'use client';

import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        <p>Please sign in to view your profile</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        {profile.photoURL ? (
          <img
            src={profile.photoURL}
            alt={profile.displayName || profile.email}
            className="h-16 w-16 rounded-full"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold">
            {(profile.displayName || profile.email || '?').charAt(0).toUpperCase()}
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-bold">
            {profile.displayName || 'User'}
          </h2>
          <p className="text-gray-600">{profile.email}</p>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              profile.role === UserRole.MASTER 
                ? 'bg-purple-100 text-purple-800'
                : profile.role === UserRole.CREATOR
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {profile.role}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-medium">Account Information</h3>
        <dl className="mt-2 text-sm text-gray-600">
          <div className="mt-1">
            <dt className="inline font-medium">User ID:</dt>
            <dd className="inline ml-1 break-all">{profile.uid}</dd>
          </div>
          <div className="mt-1">
            <dt className="inline font-medium">Created:</dt>
            <dd className="inline ml-1">
              {new Date(profile.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="mt-1">
            <dt className="inline font-medium">Last Updated:</dt>
            <dd className="inline ml-1">
              {new Date(profile.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
} 