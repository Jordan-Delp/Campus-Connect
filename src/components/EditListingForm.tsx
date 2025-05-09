'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export default function EditListingForm({ listing }: { listing: Listing }) {
  const [formData, setFormData] = useState({ ...listing });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label>Price</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label>Category</label>
        <input name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Listing</button>
    </form>
  );
}
