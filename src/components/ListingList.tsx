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
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <li key={listing._id} className="relative h-full">
          <div className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#161616] shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <Link href={`/listings/${listing._id}`} className="flex flex-1 flex-col">
            {listing.imageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-[#111111] text-sm text-zinc-500">
                No image
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[1.05rem] font-medium tracking-tight text-white">
                  {listing.title}
                </h2>
                <p className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-300">
                  ${listing.price}
                </p>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-zinc-400">
                {listing.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <p className="inline-flex rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
                  {listing.category}
                </p>
                <span className="text-xs text-zinc-500">View details</span>
              </div>
            </div>
          </Link>
      
          {(showEdit || showDelete) && (
            <div className="mt-auto flex gap-2 border-t border-white/8 px-5 py-4">
              {showEdit && (
                <Link
                  href={`/listings/edit/${listing._id}`}
                  className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-white"
                >
                  Edit
                </Link>
              )}
              {showDelete && (
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-white"
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
