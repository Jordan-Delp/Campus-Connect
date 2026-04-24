'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error')) {
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
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-white/8 bg-[#111111] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Welcome back</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Sign in to Campus Connect
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Continue your campus marketplace experience and manage your listings in one place.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-white placeholder:text-zinc-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-violet-500 px-4 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
            >
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-400">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-violet-300 hover:text-violet-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-zinc-400">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
