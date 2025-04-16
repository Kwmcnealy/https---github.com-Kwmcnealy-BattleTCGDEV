'use client';

import React from 'react';
import { Users, CreditCard, BarChartHorizontalBig, CircleDollarSign, TrendingUp, TrendingDown, Clock, MoreVertical, ArrowRight, LifeBuoy, Gamepad2, Undo2 } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard'; // Assuming you have an AuthGuard
import { UserRole } from '@/lib/types';

// Placeholder Data
const statsData = [
  { title: 'Unique Users', value: '362', trend: '+12', icon: <Users size={24} className="text-blue-500" />, trendDirection: 'up' },
  { title: 'Active Games', value: '1,056', trend: '+46', icon: <BarChartHorizontalBig size={24} className="text-green-500" />, trendDirection: 'up' },
  { title: 'Support Tickets', value: '89', trend: '+8', icon: <LifeBuoy size={24} className="text-yellow-500" />, trendDirection: 'up' },
  { title: 'Revenue This Week', value: '$9,496', trend: '-15%', icon: <CircleDollarSign size={24} className="text-red-500" />, trendDirection: 'down' },
];

const historyData = [
  { type: 'Balance Top-up', date: '20 Feb 2023 10:45', amount: '+ 5,000 USD', icon: <CreditCard size={20} className="text-gray-500" /> },
  { type: 'Game Subscription', date: '18 Feb 2023 12:10', amount: '- 29 USD', icon: <Gamepad2 size={20} className="text-gray-500" /> },
  { type: 'Refund of Order #123', date: '15 Feb 2023 09:02', amount: '- 54.21 USD', icon: <Undo2 size={20} className="text-gray-500" /> },
];

// Reusable Card Component
const InfoCard = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    {title && (
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>
    )}
    {children}
  </div>
);

// Dashboard Component
export default function AdminDashboardPage() {
  return (
    // Use AuthGuard to protect this route, specify required role
    // <AuthGuard requiredRole={UserRole.MASTER}>
      <div className="space-y-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of platform activity and metrics.</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-200">
            Generate Report
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-6">
            {statsData.map((stat, index) => (
              <InfoCard key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <div className={`flex items-center text-xs mt-1 ${stat.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trendDirection === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                      <span>{stat.trend} vs last period</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </InfoCard>
            ))}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance & Payment Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoCard title="Current Balance">
                <p className="text-4xl font-bold text-gray-800 mb-2">5,000 <span className="text-xl font-normal text-gray-500">USD</span></p>
                {/* Placeholder for graph */}
                <div className="h-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded mt-4 flex items-center justify-center text-blue-400">
                  Balance Graph Placeholder
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium">
                  Add Credit
                </button>
              </InfoCard>
              <InfoCard title="Payment Details">
                <p className="text-xs text-gray-500">Next payment 99 USD</p>
                <p className="text-sm font-medium text-gray-700 mb-3">February 14, 2023</p>
                {/* Placeholder for small bar chart */}
                <div className="h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  Payment Chart
                </div>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-xs text-gray-500">Total to pay</p>
                  <p className="text-xl font-bold text-gray-800">$9,496 <span className="text-sm font-normal text-gray-500">USD</span></p>
                </div>
              </InfoCard>
            </div>

            {/* History Card */}
            <InfoCard title="History">
              <ul className="space-y-4">
                {historyData.map((item, index) => (
                  <li key={index} className="flex items-center justify-between pb-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:underline flex items-center">
                View All History <ArrowRight size={16} className="ml-1" />
              </button>
            </InfoCard>

            {/* Other Things / Placeholder Card */}
            <InfoCard title="Other Things">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Total Time</p>
                    <p className="text-2xl font-bold text-gray-800">1h 27m</p>
                    <p className="text-xs text-gray-500 mt-1">This week</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-sm font-medium text-gray-700 mb-2">Active Subscriptions</p>
                   <p className="text-2xl font-bold text-gray-800">13%</p>
                   <p className="text-xs text-gray-500 mt-1">From last week</p>
                </div>
              </div>
            </InfoCard>

          </div>
        </div>
      </div>
    // </AuthGuard>
  );
}