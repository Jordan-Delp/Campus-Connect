'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingList from '@/components/ListingList';
import CategoryFilter from '@/components/CategoryFilter';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-400">Loading...</div>}>
      <ListingsContent />
    </Suspense>
  );
}

function ListingsContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState<Listing[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const searchFromURL = searchParams.get('search');
    if (searchFromURL) setSearch(searchFromURL);
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/listings')
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  useEffect(() => {
    let filtered = [...listings];

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(term) ||
          l.description.toLowerCase().includes(term)
      );
    }

    if (category) {
      filtered = filtered.filter((l) => l.category === category);
    }

    setFiltered(filtered);
  }, [search, category, listings]);

  return (
    <div className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-white/8 bg-[#111111] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Browse</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Browse listings
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Search by title or description, then narrow by category using a clean dark filter rail.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              {filtered.length} item{filtered.length === 1 ? '' : 's'} visible
              {search.trim() ? ` • search: ${search.trim()}` : ' • all listings'}
              {category ? ` • category: ${category}` : ''}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-[#151515] px-5 py-3 text-sm text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <CategoryFilter
              selected={category}
              onChange={setCategory}
              onReset={() => setCategory('')}
            />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4 text-sm text-zinc-400">
          <p>{filtered.length > 0 ? `${filtered.length} listings found` : 'No listings found'}</p>
          {(search || category) && <p className="text-zinc-500">Filters active</p>}
        </div>

        {filtered.length > 0 ? (
          <ListingList listings={filtered} />
        ) : (
          <div className="rounded-[1.35rem] border border-white/8 bg-[#161616] px-6 py-10 text-center text-zinc-400">
            No listings found.
          </div>
        )}
      </div>
    </div>
  );
}
