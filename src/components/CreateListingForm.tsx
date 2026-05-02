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
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? 'Upload failed');

      setFormData((prev) => ({ ...prev, imageUrl: json.url }));
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed. Please try again.');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        toast.success('Listing created successfully!');
        setFormData({ title: '', description: '', price: '', category: '', imageUrl: '' });
        setImagePreview(null);
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
      className="space-y-6 rounded-[2rem] border border-white/8 bg-[#111111] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        >
          <option value="">Select a category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Image{' '}
          <span className="text-zinc-500">(optional)</span>
        </label>

        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-[#151515] px-4 py-5 transition hover:border-violet-400/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
          <span className="text-sm text-zinc-400">
            {uploading ? 'Uploading…' : imagePreview ? 'Change image' : 'Choose an image'}
          </span>
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 h-40 w-full rounded-2xl object-cover opacity-80"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-full bg-violet-500 px-4 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Listing
      </button>
    </form>
  );
}
