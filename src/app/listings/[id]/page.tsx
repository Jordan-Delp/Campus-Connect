import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface UserType {
    name: string;
    email: string;
    createdAt: string;
  }
  
  interface ListingType {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    location?: string;
    imageUrl?: string;
    userId: UserType; // now populated
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
  const isOwner = session?.user?.id && listing.userId && typeof listing.userId !== 'string'
  ? session.user.id === (listing.userId as any)._id.toString()
  : false;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-3 gap-6">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="rounded-lg object-cover w-full h-full max-h-[300px] md:col-span-1"
            />
          ) : (
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-48 md:col-span-1">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
            <p className="text-gray-700">{listing.description}</p>

            <div className="text-xl font-semibold text-purple-600">${listing.price}</div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Category:</span> {listing.category}
            </div>
            {listing.location && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {listing.location}
              </div>
            )}

            {!isOwner && listing.userId && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-800">Seller Information</h3>
                <p className="text-sm text-gray-600">
                  Name: {listing.userId.name ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {listing.userId.email ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-500 italic">
                  Member since {listing.userId.createdAt
                    ? new Date(listing.userId.createdAt).toLocaleString('default', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Unknown'}
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                  Contact Seller
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
