import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT /api/listings/:id
// PUT /api/listings/:id
export async function PUT(request: NextRequest, context: any) {
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    if (listing.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden: You do not own this listing' }, { status: 403 });
    }

    const body = await request.json();
    const updatedListing = await Listing.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedListing, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update listing' }, { status: 500 });
  }
}


// DELETE /api/listings/:id
export async function DELETE(request: NextRequest, context: any) {
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    if (listing.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden: You do not own this listing' }, { status: 403 });
    }

    await listing.deleteOne();
    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete listing' }, { status: 500 });
  }
}
