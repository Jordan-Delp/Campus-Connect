'use client';

import { toast } from 'react-hot-toast';

export default function CopyEmailButton({ email }: { email: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard!');
    } catch {
      toast.error('Could not copy email. Please copy it manually.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-5 inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
    >
      Copy seller email
    </button>
  );
}
