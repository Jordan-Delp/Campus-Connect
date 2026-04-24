import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
      <div className="max-w-md rounded-[2rem] border border-white/8 bg-[#111111] px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Error</p>
        <h1 className="mt-3 text-6xl font-semibold tracking-tight text-white">404</h1>
        <h2 className="mt-3 text-2xl font-semibold text-white">Page not found</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
          >
            Go Home
          </Link>
          <Link
            href="/listings"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
