'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading('Creating account...');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Account created! Redirecting to sign in...', { id: loadingToast });
        router.push('/auth/signin');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Registration failed', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Unexpected error occurred.', { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-white/8 bg-[#111111] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Join the marketplace</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Set up your profile to buy, sell, and manage listings on Campus Connect.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-violet-500 px-4 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-violet-300 hover:text-violet-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
