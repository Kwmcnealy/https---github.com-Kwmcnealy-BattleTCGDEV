'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserCircleIcon, SparklesIcon, BoltIcon, HeartIcon, MoonIcon, WrenchScrewdriverIcon, CubeIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useEffect } from "react";
import { firebaseApp, auth, db } from "@/lib/firebase";

// Updated placeholder data with existing SVGs
const creators = [
  {
    id: 1,
    name: "Creator One",
    thumbnailUrl: "/globe.svg",
    websiteUrl: "https://creatorone.example.com",
    description: "A tactical grid-based game with deep strategy.",
    icon: <UserCircleIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 2,
    name: "Creator Two",
    thumbnailUrl: "/file.svg",
    websiteUrl: "https://creatortwo.example.com",
    description: "Explore vast universes in this sci-fi adventure.",
    icon: <SparklesIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 3,
    name: "Creator Three",
    thumbnailUrl: "/vercel.svg",
    websiteUrl: "https://creatorthree.example.com",
    description: "Fast-paced fantasy card battles await.",
    icon: <BoltIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 4,
    name: "Creator Four",
    thumbnailUrl: "/next.svg",
    websiteUrl: "https://creatorfour.example.com",
    description: "Charming creatures and deck-building fun.",
    icon: <HeartIcon className="h-10 w-10 text-gray-400" />
  },
   {
    id: 5,
    name: "Creator Five",
    thumbnailUrl: "/window.svg",
    websiteUrl: "https://creatorfive.example.com",
    description: "A dark fantasy world with unique mechanics.",
    icon: <MoonIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 6,
    name: "Creator Six",
    thumbnailUrl: "/globe.svg",
    websiteUrl: "https://creatorsix.example.com",
    description: "Competitive robot combat card game.",
    icon: <WrenchScrewdriverIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 7,
    name: "Creator Seven",
    thumbnailUrl: "/file.svg",
    websiteUrl: "https://creatorseven.example.com",
    description: "Pixel art strategy and resource management.",
    icon: <CubeIcon className="h-10 w-10 text-gray-400" />
  },
  {
    id: 8,
    name: "Creator Eight",
    thumbnailUrl: "/vercel.svg",
    websiteUrl: "https://creatoreight.example.com",
    description: "Build your empire in this historical TCG.",
    icon: <BuildingLibraryIcon className="h-10 w-10 text-gray-400" />
  },
];

// Placeholder banner image URL - replace with your actual image path
const bannerImageUrl = "/placeholder-banner.jpg";

export default function Home() {
  // Firebase initialization 
  useEffect(() => {
    console.log("Firebase initialized:", firebaseApp);
    // You can use auth and db here
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Header Navigation - Updated max-width */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
         {/* Replaced container with max-w-[1400px] */}
         <nav className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
           <Link href="/" className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm0 3.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM12 14l-4-4h8l-4 4z" />
             </svg>
             <span className="text-xl font-bold text-gray-800">BattleTCG</span>
           </Link>
           <ul className="flex space-x-6 items-center">
             <li><Link href="/features" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Features</Link></li>
             <li><Link href="/creators" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Creators</Link></li>
             <li><Link href="/community" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Community</Link></li>
             <li><Link href="/support" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Support</Link></li>
             <li><Link href="/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 shadow hover:shadow-md">Login</Link></li>
           </ul>
         </nav>
       </header>

      <main>
        {/* Redesigned Banner Section */}
        <section
          className="relative text-white h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center text-center bg-gray-700 bg-cover bg-center border-b border-gray-300 shadow-inner"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        >
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content container */}
          <div className="relative max-w-[1400px] mx-auto px-6 z-10">
            {/* Slogan */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 tracking-tight text-shadow-lg">
              Build Battle Belong
            </h1>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Get Started Now Button */}
              <Link
                href="/signup"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 shadow-red-600/40 relative overflow-hidden group"
              >
                 Get Started Now
                 {/* Underline glow effect */}
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-300 opacity-0 group-hover:opacity-100 group-hover:scale-x-150 transition-all duration-300 ease-out"></span>
              </Link>

              {/* Login Button */}
              <Link
                href="/login"
                className="inline-block bg-red-600/90 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 shadow-red-600/30 relative overflow-hidden group"
              >
                 Login
                 {/* Underline glow effect */}
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-300 opacity-0 group-hover:opacity-100 group-hover:scale-x-150 transition-all duration-300 ease-out"></span>
              </Link>

              {/* Features Button */}
              <Link
                href="/features"
                className="inline-block bg-transparent border-2 border-red-500 hover:bg-red-500/20 text-white font-semibold py-[10px] px-8 rounded-lg text-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 relative overflow-hidden group"
              >
                 Features
                 {/* Underline glow effect - Adjusted for border button */}
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 opacity-0 group-hover:opacity-100 group-hover:scale-x-150 transition-all duration-300 ease-out"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Creator Showcase Section - Corrected Responsive Stagger */}
        <section className="py-12 sm:py-20 bg-gray-100">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16">
              Explore Creator Universes
            </h2>
            {/* Grid classes define columns per breakpoint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20">
              {creators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  // Corrected stagger logic using responsive classes:
                  // - Default: No translation
                  // - sm (2 cols): Translate odd items (index 1, 3, 5...)
                  // - md (3 cols): Reset sm translation, translate middle item (index 1, 4, 7...)
                  className={`group transition-transform duration-300 ease-out sm:[&:nth-child(2n)]:-translate-y-12 md:[&:nth-child(2n)]:translate-y-0 md:[&:nth-child(3n+2)]:-translate-y-12`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={creator.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Note: Applying hover scale/shadow on the Link, stagger translation on the motion.div
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.15] group-hover:z-10 group-hover:shadow-red-400/40 group-focus:scale-[1.15] group-focus:z-10 group-focus:shadow-red-400/40"
                  >
                     {/* Image Area */}
                    <div className="relative w-full h-48">
                      <Image
                        src={creator.thumbnailUrl}
                        alt={`${creator.name} Thumbnail`}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 relative">
                       <div className="absolute -top-6 right-4 bg-white p-2 rounded-full shadow">
                         {creator.icon}
                       </div>

                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{creator.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {creator.description}
                      </p>
                      <span className="text-sm font-medium text-red-600 group-hover:underline">
                        Visit Site →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer - Updated max-width */}
       <footer className="py-8 border-t border-gray-200 bg-white text-center text-gray-500 text-sm">
         {/* Replaced container with max-w-[1400px] */}
         <div className="max-w-[1400px] mx-auto px-6">
           © {new Date().getFullYear()} BattleTCG. All rights reserved. |
           <Link href="/privacy" className="hover:text-red-600 px-2">Privacy Policy</Link> |
           <Link href="/terms" className="hover:text-red-600 px-2">Terms of Service</Link>
         </div>
       </footer>
    </div>
  );
}
