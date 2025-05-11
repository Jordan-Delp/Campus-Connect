'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span className="text-purple-600 text-xl">⬤</span>
            <span>CampusConnect</span>
          </Link>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full max-w-md rounded-full border px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Right: Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/listings"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                pathname.startsWith('/listings')
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              Listings
            </Link>

            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    pathname === '/dashboard'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-purple-600 px-4 py-2 text-white text-sm font-semibold hover:bg-purple-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-2 space-y-3">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full rounded-full border px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Link href="/listings" className="block text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50">
              Listings
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-white bg-red-500 rounded-full px-4 py-2 text-sm text-center hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="block text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full text-white bg-purple-600 rounded-full px-4 py-2 text-sm text-center hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
