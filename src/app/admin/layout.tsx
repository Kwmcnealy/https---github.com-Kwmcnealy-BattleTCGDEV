'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart3, Settings, LifeBuoy, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

// Sidebar Navigation Links
const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/admin/users', label: 'Users', icon: <Users size={20} /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  { href: '/admin/support', label: 'Support Tickets', icon: <LifeBuoy size={20} /> },
  // Add more admin-specific links here
];

function AdminSidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/'); // Redirect to homepage after sign out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-300 flex flex-col justify-between p-4 shadow-lg">
      <div>
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 text-white">
             <ShieldCheck size={28} className="text-red-500" />
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {adminNavLinks.map(link => {
              const isActive = pathname?.startsWith(link.href);
              return (
                <li key={link.href} className="mb-2">
                  <Link
                    href={link.href}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                    `}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer/User Info */}
      <div className="border-t border-gray-700 pt-4">
        {profile && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src={profile.photoURL || '/default-avatar.png'} 
              alt={profile.displayName || 'Admin'}
              className="h-9 w-9 rounded-full border-2 border-gray-600 object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white truncate">{profile.displayName || 'Admin User'}</p>
              <p className="text-xs text-gray-400 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-red-700 hover:text-white transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 p-6 md:p-10 min-h-screen">
        {/* Ensure AuthGuard wraps content if needed, or apply role checks */} 
        {/* Consider adding AuthGuard here if not handled per-page */}
        {children}
      </main>
    </div>
  );
} 