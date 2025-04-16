'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/lib/types';

export default function CreatorDashboard() {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AuthGuard requiredRole={UserRole.CREATOR}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <button
              onClick={signOut}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { name: 'Overview', id: 'overview' },
                    { name: 'Cards', id: 'cards' },
                    { name: 'Tournaments', id: 'tournaments' },
                    { name: 'Analytics', id: 'analytics' },
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
              
              <div className="px-4 py-5 sm:p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome, {profile?.displayName || profile?.email || 'Creator'}</h2>
                    <p className="mb-4">This is your creator dashboard where you can manage your cards, tournaments, and analytics.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg font-medium text-gray-900">Cards</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Manage your card database.
                          </p>
                          <div className="mt-4">
                            <span className="text-2xl font-bold">0</span>
                            <span className="text-sm text-gray-500 ml-2">Total Cards</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg font-medium text-gray-900">Tournaments</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Track your tournaments.
                          </p>
                          <div className="mt-4">
                            <span className="text-2xl font-bold">0</span>
                            <span className="text-sm text-gray-500 ml-2">Active Tournaments</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg font-medium text-gray-900">Players</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Monitor your player base.
                          </p>
                          <div className="mt-4">
                            <span className="text-2xl font-bold">0</span>
                            <span className="text-sm text-gray-500 ml-2">Active Players</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'cards' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-medium text-gray-900">Card Management</h2>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Add New Card
                      </button>
                    </div>
                    <p className="text-gray-500">No cards to display. Create your first card to get started.</p>
                  </div>
                )}
                
                {activeTab === 'tournaments' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-medium text-gray-900">Tournament Management</h2>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Create Tournament
                      </button>
                    </div>
                    <p className="text-gray-500">No tournaments to display. Create your first tournament to get started.</p>
                  </div>
                )}
                
                {activeTab === 'analytics' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Analytics</h2>
                    <p className="text-gray-500">Analytics features will be available soon.</p>
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