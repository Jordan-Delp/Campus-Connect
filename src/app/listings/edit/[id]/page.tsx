import EditListingForm from '@/components/EditListingForm';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage(context: { params: { id: string } }) {
    const { id } = await context.params;
  
    await dbConnect();
    const listing = await Listing.findById(id).lean();
  
    if (!listing) return notFound();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
        <EditListingForm listing={JSON.parse(JSON.stringify(listing))} />
      </div>
    );
  }
