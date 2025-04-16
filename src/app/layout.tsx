import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";
import Link from "next/link";
import { Sparkles, Users, MessageCircle, LifeBuoy, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BattleTCG",
  description: "Your platform for trading card game battles",
};

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white text-center text-gray-500 text-sm">
      <div className="max-w-[1400px] mx-auto px-6">
        © {new Date().getFullYear()} BattleTCG. All rights reserved. |
        <Link href="/privacy" className="hover:text-red-600 px-2">Privacy Policy</Link> |
        <Link href="/terms" className="hover:text-red-600 px-2">Terms of Service</Link>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Header />
            <main>{children}</main>
            <Footer />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
