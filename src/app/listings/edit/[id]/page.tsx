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

export default async function EditListingPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect('/auth/signin');
  }

  await dbConnect();

  const listing = await Listing.findById(id).lean<ListingType>();
  if (!listing) {
    redirect('/not-found');
  }

  if (listing.userId.toString() !== session.user.id) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Edit listing</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Edit listing
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Update the item details using the same premium dark form treatment.
          </p>
        </div>
      <EditListingForm listing={JSON.parse(JSON.stringify(listing))} />
      </div>
    </main>
  );
}

