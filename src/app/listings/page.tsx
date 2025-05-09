import React from 'react';
import ListingList from '@/components/ListingList';

export default function ListingsPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      <ListingList />
    </main>
  );
}
