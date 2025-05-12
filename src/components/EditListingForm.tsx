'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const categoryOptions = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Housing',
  'Services',
  'Other',
];

export default function EditListingForm({ listing }: { listing: Listing }) {
  const [formData, setFormData] = useState({ ...listing });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/listings/${listing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        alert(`Failed to update listing: ${data.message}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An error occurred');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-purple-100 shadow-md rounded-lg p-6 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-800">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Price ($)</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm"
        >
          <option value="">Select a category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
      >
        Update Listing
      </button>
    </form>
  );
}
