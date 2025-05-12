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
    <div className="bg-[#f9fafb] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Listings</h1>

        {listings.length > 0 ? (
          <ListingList
            listings={JSON.parse(JSON.stringify(listings))}
            showDelete={true}
            showEdit={true}
          />
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-2">You have no listings yet.</p>
            <Link
              href="/listings/create"
              className="text-purple-600 hover:underline font-medium"
            >
              Create one now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
