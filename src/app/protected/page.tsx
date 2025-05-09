import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/auth/signin');

  return <div className="p-4">Welcome, {session.user?.email}!</div>;
}
