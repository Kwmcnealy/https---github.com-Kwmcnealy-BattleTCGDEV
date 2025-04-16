'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import UserProfile from '@/components/UserProfile';
import { UserRole } from '@/lib/types';

export default function PlayerDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Player Dashboard</h1>
              <Link 
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-6 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {[
                      { name: 'Profile', id: 'profile' },
                      { name: 'Decks', id: 'decks' },
                      { name: 'Tournaments', id: 'tournaments' },
                      { name: 'Settings', id: 'settings' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-red-500 text-red-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              {/* Content based on selected tab */}
              <div className="mt-6">
                {activeTab === 'profile' && (
                  <UserProfile />
                )}
                
                {activeTab === 'decks' && (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Your Decks</h2>
                    <p className="text-gray-500 mb-4">You haven't created any decks yet. Start building your first deck!</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                      Create New Deck
                    </button>
                  </div>
                )}
                
                {activeTab === 'tournaments' && (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Your Tournaments</h2>
                    <p className="text-gray-500 mb-4">You haven't joined any tournaments yet.</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                      Browse Tournaments
                    </button>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Account Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="display-name" className="block text-sm font-medium text-gray-700">
                          Display Name
                        </label>
                        <input
                          type="text"
                          id="display-name"
                          name="display-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          defaultValue={profile?.displayName || ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="mt-1 text-sm text-gray-500">
                          {profile?.email}
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 