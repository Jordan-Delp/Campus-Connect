import React from 'react';
import CreateListingForm from '@/components/CreateListingForm';

export default function CreateListingPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Listing</h1>
        <CreateListingForm />
      </div>
    </main>
  );
}
