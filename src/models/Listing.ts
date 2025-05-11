import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  location?: string;
  imageUrl?: string;
  userId: mongoose.Types.ObjectId;
}

const ListingSchema = new Schema<IListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  location: String,
  imageUrl: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);
