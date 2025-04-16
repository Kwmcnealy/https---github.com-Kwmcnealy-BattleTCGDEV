'use client';

import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Sparkles, Users, MessageCircle, LifeBuoy, LogIn } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/features', label: 'Features', icon: <Sparkles className="h-5 w-5 mr-2" /> },
    { href: '/creators', label: 'Creators', icon: <Users className="h-5 w-5 mr-2" /> },
    { href: '/community', label: 'Community', icon: <MessageCircle className="h-5 w-5 mr-2" /> },
    { href: '/support', label: 'Support', icon: <LifeBuoy className="h-5 w-5 mr-2" /> },
    { href: '/login', label: 'Login', icon: <LogIn className="h-5 w-5 mr-2" /> },
  ];
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 shadow hover:shadow-lg group relative overflow-hidden
            ${isHome ? 'bg-red-600 text-white shadow-red-400/60 ring-2 ring-red-400' : 'bg-white text-gray-800 hover:bg-red-600 hover:text-white hover:shadow-red-400/60'}
          `}
          aria-current={isHome ? 'page' : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-colors duration-300 ${isHome ? 'text-white' : 'text-red-600 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm0 3.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM12 14l-4-4h8l-4 4z" />
          </svg>
          <span className="text-xl font-bold">BattleTCG</span>
        </Link>
        <ul className="flex space-x-2 items-center">
          {navLinks.map(link => {
            // Only highlight nav link if not home and pathname matches
            const isActive = !isHome && pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center px-4 py-2 rounded-md font-semibold transition-all duration-300 shadow hover:shadow-lg
                    ${isActive
                      ? 'bg-red-600 text-white shadow-red-400/60 ring-2 ring-red-400'
                      : 'bg-white text-gray-600 hover:bg-red-600 hover:text-white hover:shadow-red-400/60'}
                    group relative overflow-hidden
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Ensure icon color transitions correctly */} 
                  {React.cloneElement(link.icon, { className: `h-5 w-5 mr-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}` })}
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
} 