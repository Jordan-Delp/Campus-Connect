import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
}

const ListingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false},
  },
  { timestamps: true }
);

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);
