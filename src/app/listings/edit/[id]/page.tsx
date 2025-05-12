import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import EditListingForm from '@/components/EditListingForm';

interface ListingType {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  userId: string;
}

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect('/auth/signin');
  }

  await dbConnect();
  const listing = await Listing.findById(params.id).lean<ListingType>();

  if (!listing) {
    redirect('/not-found');
  }

  if (listing.userId !== session.user.id) {
    redirect('/dashboard');
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
      <EditListingForm listing={JSON.parse(JSON.stringify(listing))} />
    </main>
  );
}
