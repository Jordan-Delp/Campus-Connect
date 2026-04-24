import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface UserType {
  _id: string;
  name: string;
  email: string;
}

interface ListingType {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location?: string;
  imageUrl?: string;
  userId: UserType;
}

export default async function ListingDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  await dbConnect();

  const listing = await Listing.findById(id)
    .populate('userId', 'name email createdAt')
    .lean<ListingType>();

  if (!listing) return notFound();

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === listing.userId?._id?.toString();

  return (
    <div className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-zinc-400">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Listing details</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {listing.title}
            </h1>
          </div>
          <span className="rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
            {listing.category}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[#161616] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="h-full max-h-[640px] w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center bg-[#111111] text-sm text-zinc-500">
              No Image Available
            </div>
          )}
          </div>

          <div className="space-y-6 rounded-[2rem] border border-white/8 bg-[#111111] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
                ${listing.price}
              </span>
              {listing.location && (
                <span className="rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  {listing.location}
                </span>
              )}
            </div>

            <p className="max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
              {listing.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-[#161616] p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Category</p>
                <p className="mt-2 text-sm font-medium text-white">{listing.category}</p>
              </div>
              {listing.location && (
                <div className="rounded-2xl border border-white/8 bg-[#161616] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Location</p>
                  <p className="mt-2 text-sm font-medium text-white">{listing.location}</p>
                </div>
              )}
            </div>

            {!isOwner && listing.userId && (
              <div className="rounded-[1.5rem] border border-white/8 bg-[#161616] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                  Seller information
                </p>
                <div className="mt-4 space-y-2 text-sm text-zinc-300">
                  <p>
                    <span className="text-zinc-500">Name:</span> {listing.userId.name ?? 'N/A'}
                  </p>
                  <p>
                    <span className="text-zinc-500">Email:</span> {listing.userId.email ?? 'N/A'}
                  </p>
                </div>
                <a
                  href={`mailto:${listing.userId.email}`}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
                >
                  Contact Seller
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
