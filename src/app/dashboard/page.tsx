import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import ListingList from '@/components/ListingList';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect('/auth/signin');
  }

  await dbConnect();
  const listings = await Listing.find({ userId: session.user.id }).lean();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      <ListingList listings={JSON.parse(JSON.stringify(listings))} showDelete={true} />

    </div>
  );
}
