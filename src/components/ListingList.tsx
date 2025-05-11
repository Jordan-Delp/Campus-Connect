'use client';
import React from 'react';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface Props {
  listings: Listing[];
  showDelete?: boolean;
  showEdit?: boolean;
}

export default function ListingList({ listings, showDelete = false, showEdit = false }: Props) {
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this listing?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json();
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      console.error('Error deleting listing:', err);
      alert('Unexpected error occurred');
    }
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <li
          key={listing._id}
          className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden"
        >
          {listing.imageUrl && (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">{listing.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="mt-2 text-gray-800 font-semibold">${listing.price}</p>
            <p className="text-sm text-purple-600 font-medium">{listing.category}</p>

            <div className="mt-4 flex gap-4">
              {showEdit && (
                <Link
                  href={`/listings/edit/${listing._id}`}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Edit
                </Link>
              )}
              {showDelete && (
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="text-sm text-red-600 font-medium hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
