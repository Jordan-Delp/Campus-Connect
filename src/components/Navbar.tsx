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
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#0a0a0a]/85 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em] uppercase text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.18)]">
              CC
            </span>
            <span className="hidden sm:block">Campus Connect</span>
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 justify-center px-6"
          >
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-xl rounded-full border border-white/10 bg-[#141414] px-5 py-3 text-sm text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition focus:border-violet-400/50 focus:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </form>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/listings"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname.startsWith('/listings')
                  ? 'border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-[0_0_0_1px_rgba(139,92,246,0.18)]'
                  : 'border border-white/10 bg-[#141414] text-zinc-200 hover:border-violet-400/25 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              Listings
            </Link>

            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    pathname === '/dashboard'
                      ? 'border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-[0_0_0_1px_rgba(139,92,246,0.18)]'
                      : 'border border-white/10 bg-[#141414] text-zinc-200 hover:border-violet-400/25 hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/15 hover:bg-white/10 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.25)] transition hover:bg-violet-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Toggle navigation"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden space-y-3 border-t border-white/8 pb-4 pt-4 text-white">
            <form onSubmit={handleSearchSubmit} className="pt-1">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-[#141414] px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </form>
            <Link href="/listings" className="block rounded-full px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
              Listings
            </Link>
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block rounded-full px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-center text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="block rounded-full px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full rounded-full bg-violet-500 px-4 py-3 text-sm text-center font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.25)] hover:bg-violet-400"
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
