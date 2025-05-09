import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const ListingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);
