import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect('/auth/signin');
  }

  await dbConnect();
  const listings = await Listing.find({ userId: session.user.id });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing: any) => (
          <div key={listing._id} className="border rounded p-4 shadow-sm">
            {listing.imageUrl && (
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                width={400}
                height={250}
                className="rounded mb-3"
              />
            )}
            <h2 className="text-lg font-semibold">{listing.title}</h2>
            <p className="text-sm text-gray-600">${listing.price}</p>
            <p className="text-sm">{listing.description}</p>
            {/* Add edit and delete buttons here later */}
          </div>
        ))}
      </div>
    </div>
  );
}
