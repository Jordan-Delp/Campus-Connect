'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchParams.get('error')) {
      setError(true);
      toast.error('Invalid email or password');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
      redirect: false,
    });

    if (result?.ok) {
      toast.success('Signed in successfully!');
      window.location.href = result.url || '/dashboard';
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-purple-100">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Sign In to CampusConnect
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded bg-white text-black shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded bg-white text-black shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded shadow transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link href="/" className="text-purple-600 hover:underline">
            Go Home
          </Link>
        </p>
      </div>
    </div>
  );
}
