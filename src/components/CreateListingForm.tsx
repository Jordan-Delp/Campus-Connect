'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const categoryOptions = [
  'Electronics',
  'Books',
  'Clothing',
  'Furniture',
  'Housing',
  'Services',
  'Other',
];

export default function CreateListingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = '';
    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (uploadRes.ok) {
        const uploadResult = await uploadRes.json();
        imageUrl = `/uploads/${uploadResult.filename}`;
      } else {
        toast.error('Image upload failed.');
        return;
      }
    }

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          imageUrl,
        }),
      });

      if (response.ok) {
        toast.success('Listing created successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
        });
        setFile(null);
        router.push('/dashboard');
      } else {
        toast.error('Failed to create listing.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.');
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
          type="text"
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
          type="number"
          name="price"
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
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white text-black shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
      >
        Create Listing
      </button>
    </form>
  );
}
