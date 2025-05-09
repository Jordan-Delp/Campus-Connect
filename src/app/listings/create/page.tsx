import React from 'react';
import CreateListingForm from '@/components/CreateListingForm';

export default function CreateListingPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Listing</h1>
      <CreateListingForm />
    </main>
  );
}
