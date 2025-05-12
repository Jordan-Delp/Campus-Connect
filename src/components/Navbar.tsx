'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false); // Close mobile menu if open
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center space-x-2">
            <span className="text-white text-xl">⬤</span>
            <span>CampusConnect</span>
          </Link>

          {/* Center Search (Desktop Only) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 justify-center px-6">
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md rounded-full border px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white shadow-sm"
            />
          </form>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/listings"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                pathname.startsWith('/listings')
                  ? 'bg-white text-purple-700'
                  : 'hover:bg-purple-700/20'
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
                      ? 'bg-white text-purple-700'
                      : 'hover:bg-purple-700/20'
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
                  className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700/20 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-white text-purple-700 px-4 py-2 text-sm font-semibold hover:bg-purple-100 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-3 space-y-3 text-white">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
              />
            </form>
            <Link href="/listings" className="block text-sm px-3 py-2 rounded-md hover:bg-purple-700/30">
              Listings
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block text-sm px-3 py-2 rounded-md hover:bg-purple-700/30">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full bg-red-500 rounded-full px-4 py-2 text-sm text-white text-center hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="block text-sm px-3 py-2 rounded-md hover:bg-purple-700/30">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full bg-white text-purple-700 rounded-full px-4 py-2 text-sm text-center hover:bg-purple-100"
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
