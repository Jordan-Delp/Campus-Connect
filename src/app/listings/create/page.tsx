import React from 'react';
import CreateListingForm from '@/components/CreateListingForm';

export default function CreateListingPage() {
  return (
    <main className="min-h-screen px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">New listing</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create a new listing
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Add product details in a clean dark form that matches the rest of the marketplace.
          </p>
        </div>
        <CreateListingForm />
      </div>
    </main>
  );
}
