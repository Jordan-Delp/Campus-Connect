import Link from 'next/link';
import Listing from '@/models/Listing';
import dbConnect from '@/lib/mongodb';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export default async function Home() {
  await dbConnect();

  const featuredListings = (await Listing.find().limit(6).lean()) as unknown as Listing[];


  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#111111] px-6 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:px-10 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_24%)]" />
          <div className="relative max-w-3xl">
              <p className="mb-5 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
                Campus marketplace
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Buy, sell, and trade in a dark streetwear marketplace made for campus life.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Find textbooks, furniture, clothing, and services in a clean, high-contrast browsing experience with strong pricing, calm spacing, and focused discovery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.22)] transition hover:bg-violet-400"
                >
                  Browse Listings
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 hover:text-white"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Featured listings
            </h2>
          </div>
          <Link href="/listings" className="text-sm text-zinc-400 transition hover:text-violet-300">
            View all listings
          </Link>
        </div>

        {featuredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <Link
                key={listing._id}
                href={`/listings/${listing._id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#161616] shadow-[0_18px_40px_rgba(0,0,0,0.26)] transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              >
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center bg-[#111111] text-sm text-zinc-500">
                    No image
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1.05rem] font-medium tracking-tight text-white">{listing.title}</h3>
                    <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-300">
                      ${listing.price}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-zinc-400">
                    {listing.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <span className="inline-flex rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
                      {listing.category}
                    </span>
                    <span className="text-xs text-zinc-500">Open listing</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.35rem] border border-white/8 bg-[#161616] px-6 py-10 text-center text-zinc-400">
            No listings found. Be the first to post.
          </div>
        )}
      </section>
    </main>
  );
}
