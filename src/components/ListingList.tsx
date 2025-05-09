'use client';
import React from 'react';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export default function ListingList({ listings }: { listings: Listing[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <li key={listing._id} className="border p-4 rounded shadow-sm">
          {listing.imageUrl && (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}
          <h2 className="text-lg font-bold">{listing.title}</h2>
          <p>{listing.description}</p>
          <p className="text-gray-600">${listing.price}</p>
          <p className="text-sm text-gray-500">{listing.category}</p>
        </li>
      ))}
    </ul>
  );
}
