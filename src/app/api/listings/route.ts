
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const newListing = await Listing.create(body);
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create listing' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const listings = await Listing.find();
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve listings' }, { status: 500 });
  }
}
