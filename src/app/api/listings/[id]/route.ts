import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';

interface RouteParams {
  params: { id: string };
}

// PUT /api/listings/:id
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const updatedListing = await Listing.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedListing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(updatedListing, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update listing' }, { status: 500 });
  }
}

// DELETE /api/listings/:id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }

  try {
    await dbConnect();
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete listing' }, { status: 500 });
  }
}
