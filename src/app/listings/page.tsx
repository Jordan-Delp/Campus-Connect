import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import ListingList from '@/components/ListingList';

export default async function PublicListingsPage() {
  await dbConnect();
  const listings = await Listing.find({}).lean();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Listings</h1>
      <ListingList listings={JSON.parse(JSON.stringify(listings))} />
    </div>
  );
}
