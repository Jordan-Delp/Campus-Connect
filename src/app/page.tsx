import Link from 'next/link';
import Listing from '@/models/Listing';
import dbConnect from '@/lib/mongodb';

export default async function Home() {
  await dbConnect();
  const featuredListings = await Listing.find().limit(6).lean();

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-20 px-6 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4">Campus Marketplace for Students</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Buy, sell, and trade with other students on your campus. Find everything from textbooks and housing to services and more.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/listings"
            className="bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Browse Listings
          </Link>
          <Link
            href="/dashboard"
            className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-purple-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Listings</h2>

        {featuredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredListings.map((listing: any) => (
              <Link
                key={listing._id}
                href={`/listings/${listing._id}`}
                className="bg-white border border-purple-100 shadow-sm rounded-lg overflow-hidden hover:shadow-lg transition hover:border-purple-300"
              >
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="h-40 bg-gray-100 flex items-center justify-center text-sm text-gray-400 italic">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                  <div className="text-purple-600 font-semibold mt-2">${listing.price}</div>
                  <div className="text-xs text-gray-400">{listing.category}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No listings found. Be the first to post!</p>
        )}
      </section>
    </main>
  );
}
