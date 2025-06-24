import { Schema, model, Document, Types } from 'mongoose';

// Interface for TypeScript type checking
interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IRestaurant extends Document {
  name: string;
  cuisine: string[];
  image: Types.ObjectId | null;
  address: string;
  suppliers?: string[];
  rating: number;
  distance?: number;
  distanceUnit?: string;
  userId: Types.ObjectId;
  isApproved: string;
  location: ILocation; // GeoJSON location
  googleMapsPlaceId?: string; // Unique ID from Google Maps
  googleMapsUrl?: string; // Direct URL to the place
  inWishlists?: Types.ObjectId[]; // Array of wishlists that include this restaurant
}

// Mongoose schema
const RestaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  inWishlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Wishlist',
    default: []
  }],
  image: {
    type: Schema.Types.ObjectId,  
    default:null,
    ref:"Image"
  },
  cuisine: {
    type: [String],
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  suppliers: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  distance: {
    type: Number,
  },
  distanceUnit: {
    type: String,
    required: true,
    enum: ['km', 'miles'],
    default: 'km'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: String,
    required: true,
    enum: ['pending','approved','rejected']
   
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coords: [number, number]) => {
          // Validate longitude (-180 to 180) and latitude (-90 to 90)
          return coords[0] >= -180 && coords[0] <= 180 && 
                 coords[1] >= -90 && coords[1] <= 90;
        },
        message: 'Invalid coordinates. Longitude must be between -180 and 180, latitude between -90 and 90.'
      }
    }
  },
  googleMapsPlaceId: {
    type: String,
    trim: true
  },
  googleMapsUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create a 2dsphere index for geospatial queries
RestaurantSchema.index({ location: '2dsphere' });

// Create and export the model
export const Restaurant = model<IRestaurant>('Restaurant', RestaurantSchema);