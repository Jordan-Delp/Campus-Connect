import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import ListingList from '@/components/ListingList';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect('/auth/signin');
  }

  await dbConnect();
  const listings = await Listing.find({ userId: session.user.id }).lean();

  return (
    <div className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-white/8 bg-[#111111] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your listings
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                Manage your live listings and keep your marketplace profile current.
              </p>
            </div>
          <Link
            href="/listings/create"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
          >
            + Create Listing
          </Link>
        </div>
        </div>

        {listings.length > 0 ? (
          <ListingList
            listings={JSON.parse(JSON.stringify(listings))}
            showDelete={true}
            showEdit={true}
          />
        ) : (
          <div className="rounded-[1.35rem] border border-white/8 bg-[#161616] px-6 py-10 text-center text-zinc-400">
            <p className="mb-2">You have no listings yet.</p>
            <Link
              href="/listings/create"
              className="font-medium text-violet-300 hover:text-violet-200"
            >
              Create one now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
