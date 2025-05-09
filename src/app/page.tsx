import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to CampusConnect</h1>
      <Link href="/listings" className="text-blue-500 underline">
        View Listings
      </Link>
      <hr />
      <Link href="/dashboard" className="text-blue-600 underline">Your Dashboard</Link>
    </main>
  );
}