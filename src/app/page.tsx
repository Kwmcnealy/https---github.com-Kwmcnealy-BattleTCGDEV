'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserCircleIcon, SparklesIcon, BoltIcon, HeartIcon, MoonIcon, WrenchScrewdriverIcon, CubeIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useEffect } from "react";
import { firebaseApp, auth, db } from "@/lib/firebase";
import { Home as HomeIcon, Sparkles, Users, MessageCircle, LifeBuoy, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  // Firebase initialization 
  useEffect(() => {
    console.log("Firebase initialized:", firebaseApp);
    // You can use auth and db here
  }, []);

  // Navigation config
  const navLinks = [
    { href: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" /> },
    { href: '/features', label: 'Features', icon: <Sparkles className="h-5 w-5 mr-2" /> },
    { href: '/creators', label: 'Creators', icon: <Users className="h-5 w-5 mr-2" /> },
    { href: '/community', label: 'Community', icon: <MessageCircle className="h-5 w-5 mr-2" /> },
    { href: '/support', label: 'Support', icon: <LifeBuoy className="h-5 w-5 mr-2" /> },
    { href: '/login', label: 'Login', icon: <LogIn className="h-5 w-5 mr-2" /> },
  ];

  // Banner buttons config
  const bannerButtons = [
    { href: '/signup', label: 'Get Started Now', icon: <UserPlus className="h-5 w-5 mr-2" />, style: 'primary' },
    { href: '/login', label: 'Login', icon: <LogIn className="h-5 w-5 mr-2" />, style: 'secondary' },
    { href: '/features', label: 'Features', icon: <ArrowRight className="h-5 w-5 mr-2" />, style: 'outline' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-[family-name:var(--font-geist-sans)]">
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
              {bannerButtons.map(btn => (
                <a
                  key={btn.href}
                  href={btn.href}
                  className={`inline-flex items-center justify-center font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow group relative overflow-hidden
                    ${btn.style === 'primary' ?
                      'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40 hover:shadow-xl hover:scale-105 ring-2 ring-red-400 hover:ring-4'
                    : btn.style === 'secondary' ?
                      'bg-red-600/90 hover:bg-red-700 text-white shadow-md hover:shadow-lg hover:scale-105 shadow-red-600/30 ring-2 ring-red-400 hover:ring-4'
                    : 'bg-transparent border-2 border-red-500 hover:bg-red-600 hover:text-white text-white hover:border-red-700 shadow-sm hover:shadow-md hover:scale-105 ring-2 ring-red-400 hover:ring-4'}
                  `}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </a>
              ))}
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
    </div>
  );
}
