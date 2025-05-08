'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';

const listingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
});

export async function createListing(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: Number(formData.get('price')),
    category: formData.get('category'),
  };

  const result = listingSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await dbConnect();
  await Listing.create(result.data);

  redirect('/listings');
}
