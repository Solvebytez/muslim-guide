// src/models/wishlist.model.ts
import { Schema, model, Document, Types } from 'mongoose';
import { IRestaurant } from './restaurant.model';

// Interface for TypeScript
interface IWishlist extends Document {
  user: Types.ObjectId;
  restaurants: Types.ObjectId[]
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const WishlistSchema = new Schema<IWishlist>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Each user has only one wishlist
  },
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    default: []
  }]
}, {
  timestamps: true
});

// Create and export the model
export const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);