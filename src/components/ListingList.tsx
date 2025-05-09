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

          {showDelete && (
            <button
              onClick={() => handleDelete(listing._id)}
              className="mt-2 text-red-600 hover:underline"
            >
              Delete
            </button>
          )}

          {showEdit && (
            <a
              href={`/listings/edit/${listing._id}`}
              className="mt-2 text-blue-600 hover:underline block"
              >
                Edit
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
