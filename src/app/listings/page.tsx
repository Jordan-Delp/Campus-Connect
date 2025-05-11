'use client';

import { useEffect, useState } from 'react';
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
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState<Listing[]>([]);

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
    <div className="bg-[#f9fafb] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Listings</h1>
  
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
          />
          <CategoryFilter
            selected={category}
            onChange={setCategory}
            onReset={() => setCategory('')}
          />
        </div>
  
        {filtered.length > 0 ? (
          <ListingList listings={filtered} />
        ) : (
          <p className="text-gray-500 text-sm">No listings found.</p>
        )}
      </div>
    </div>
  );
  
}
