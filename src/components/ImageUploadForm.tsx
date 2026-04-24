'use client';

import { useState } from 'react';

export default function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full rounded-2xl border border-white/10 bg-[#151515] text-sm text-zinc-400 file:mr-4 file:rounded-full file:border-0 file:bg-violet-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-violet-400"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
      >
        Upload Image
      </button>
    </form>
  );
}
