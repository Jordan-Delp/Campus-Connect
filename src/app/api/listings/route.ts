import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const newListing = await Listing.create({
      ...body,
      userId: session.user.id,
    });
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ message: 'Failed to create listing' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const listings = await Listing.find();
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error retrieving listings:', error);
    return NextResponse.json({ message: 'Failed to retrieve listings' }, { status: 500 });
  }
}
