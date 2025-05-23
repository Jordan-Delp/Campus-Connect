'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

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

    const deletingToast = toast.loading('Deleting listing...');

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Listing deleted.', { id: deletingToast });
        window.location.reload();
      } else {
        const data = await res.json();
        toast.error(`Failed to delete: ${data.message}`, { id: deletingToast });
      }
    } catch (err) {
      console.error('Error deleting listing:', err);
      toast.error('Unexpected error occurred.', { id: deletingToast });
    }
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <li key={listing._id} className="relative">
        <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col h-full">
          <Link href={`/listings/${listing._id}`} className="flex-1 block">
            {listing.imageUrl ? (
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            
            ) : (
              <div className="w-full h-48 bg-gray-100 text-gray-400 flex items-center justify-center text-sm">
                No image
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{listing.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
              <p className="mt-2 text-gray-800 font-semibold">${listing.price}</p>
              <p className="text-sm text-purple-600 font-medium">{listing.category}</p>
            </div>
          </Link>
      
          {(showEdit || showDelete) && (
            <div className="px-4 pb-4 flex gap-2 mt-auto">
              {showEdit && (
                <Link
                  href={`/listings/edit/${listing._id}`}
                  className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                >
                  Edit
                </Link>
              )}
              {showDelete && (
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </li>
      
      ))}
    </ul>
  );
}
