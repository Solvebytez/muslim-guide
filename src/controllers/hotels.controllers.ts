import { ValidationError } from "../config/error.config";
import { asyncHandler } from "../middleware/asyncHandler";
import { Image } from "../models/image.model";
import { IRestaurant, Restaurant } from "../models/restaurant.model";
import { deleteImagefromCloudnery } from "../utils/imageUtils";
import { apiSuccessResponse } from "../utils/response";
import { httpCode } from "../config/http.config";
import User from "../models/user.model";
import { Wishlist } from "../models/wishlist.model";
import { Types } from "mongoose";
import { NextFunction } from "express";
import { randomUUID } from "crypto";

export const addHotels = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
        throw new ValidationError("Image is required");
      }
    
      const userId = (req as any).user?._id;
    
      const { hotelData, phoneNumber, cuisines } = req.body;
      if (!hotelData || !phoneNumber || !cuisines) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: hotelData, phoneNumber, or cuisines",
        });
      }
    
      const parsedHotelData = JSON.parse(hotelData);
      const parsedCuisines = JSON.parse(cuisines);
    
      console.log( parsedHotelData,parsedCuisines,phoneNumber,userId);

    const newRestaurant = new Restaurant({
      name: parsedHotelData.name,
      cuisine: parsedCuisines,
      address: parsedHotelData.formatted_address,
      rating: parsedHotelData.rating,
      userId: userId, // Replace with actual user ID (e.g., from req.user._id)
      isApproved: "pending", // Default status
      location: {
        type: "Point",
        coordinates: [
          parsedHotelData.coordinates.lng,
          parsedHotelData.coordinates.lat,
        ], // GeoJSON format: [longitude, latitude]
      },
      googleMapsPlaceId: parsedHotelData.place_id,
      googleMapsUrl: parsedHotelData.googleMapsUrl,
      image: null
    });

    const savedRestaurant = await newRestaurant.save();


 const image = await Image.create({
      createdBy: userId,
      public_id: req.file.filename,
      url: req.file.path,
      associatedModel: {
        kind: "Restaurant",
        item: null,
      },
    });

    savedRestaurant.image = image._id as any;
    await savedRestaurant.save();

    image.associatedModel.item = savedRestaurant._id as any;
   await image.save();


    apiSuccessResponse(res, "User logged in!", httpCode.CREATED);
  } catch (error) {
    if (req.file) {
      console.log("imageFile.file.filename DELETED", req.file.filename);
      await deleteImagefromCloudnery(req.file.filename);
    }
    next(error);
  }
});

export const getApprovedHotelsByUser = asyncHandler(async (req, res, next) => {
  const userId = (req as any).user?._id;
      if (!userId) {
        throw new ValidationError("User ID is required");
      }

      console.log("getApprovedHotelsByUser", userId);

      const user = await User.findById(userId);

      if (!user) {
        throw new ValidationError("User not found");
      }

      if (user.role !== "vendor") {
        throw new ValidationError("User is not a vendor");        
      }

      const pageNumber = parseInt(req.body.pageNumber as string) || 1;
      const pageSize = 3;
      const skip = (pageNumber - 1) * pageSize;

      const query = { userId: userId, isApproved: "approved" };

      const [restaurants, totalRestaurantsByUser] = await Promise.all([
        Restaurant.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(pageSize).populate('image'),
        Restaurant.countDocuments(query)
      ]);
    
      const hasNextPage = skip + restaurants.length < totalRestaurantsByUser;


      apiSuccessResponse(res, "successful", httpCode.OK, {
        restaurants,
        totalRestaurantsByUser,
        hasNextPage,
        current_page: pageNumber
      })
})

export const getPendingHotelsByUser = asyncHandler(async (req, res, next) => {
  const userId = (req as any).user?._id;
  if (!userId) {
    throw new ValidationError("User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ValidationError("User not found");
  }

  if (user.role !== "vendor") {
    throw new ValidationError("User is not a vendor");        
  }


  const pageNumber = parseInt(req.body.pageNumber as string) || 1;
  console.log(req.body.pageNumber,"pageNumber")
  const pageSize = 4;
  const skip = (pageNumber - 1) * pageSize;

  const query = { userId: userId, isApproved: { $ne: "approved" } };

  const [restaurants, totalRestaurantsByUser] = await Promise.all([
    Restaurant.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize).populate('image'),
    Restaurant.countDocuments(query)
  ]);

  const hasNextPage = (pageNumber * pageSize) < totalRestaurantsByUser;
  console.log("hasNextPage", hasNextPage,totalRestaurantsByUser,skip + restaurants.length);

  apiSuccessResponse(res, "successful", httpCode.OK, {
    restaurants,
    totalRestaurantsByUser,
    hasNextPage,
    current_page: pageNumber
  })
})

interface CuisineGroups {
  [key: string]: IRestaurant[];
}


export const getApprovedHotels = asyncHandler(async (req, res, next) => {
  const userId = (req as any).user?._id;
  if (!userId) {
    throw new ValidationError("User ID is required");
  }
  
  const user = await User.findById(userId);
  if (!user) {
    throw new ValidationError("User not found");
  }


  const pageNumber = parseInt(req.body?.pageNumber as string) || 1;
  const pageSize = 3;
  const skip = (pageNumber - 1) * pageSize;

  // Fetch user's wishlist
  const wishlist = await Wishlist.findOne({ user: userId }).select("restaurants");
  const wishlistRestaurantIds = new Set(
    wishlist?.restaurants.map((id) => id.toString()) || []
  );

// Step 1: Fetch approved restaurants
const allRestaurants = await Restaurant.find({ isApproved: 'approved' }).sort({ createdAt: -1 }).populate('image');

// Step 2: Group by cuisine
const grouped: Record<string, IRestaurant[]|any> = {};

allRestaurants.forEach((restaurant) => {

  const isInWishlist = wishlistRestaurantIds.has((restaurant._id as Types.ObjectId).toString());

  const restaurantWithFlag = {
    ...restaurant.toObject(),
    isInWishlist,
  };

  restaurant.cuisine.forEach((cuisine) => {
    if (!grouped[cuisine]) grouped[cuisine] = [];
    grouped[cuisine].push(restaurantWithFlag);
  });
});

// Step 3: Convert to array of cuisine groups
const allCuisineGroups = Object.entries(grouped).map(([cuisine, restaurants]) => ({
  _id: randomUUID(), // ✅ Truly unique ID
  cuisine,
  restaurants,
  totalCount: restaurants.length,
}));

// Step 4: Apply pagination to the cuisine groups
const paginatedGroups = allCuisineGroups.slice(skip, skip + pageSize);

// Step 5: Add pagination metadata
const response = {
  current_page: pageNumber,
  hasNextPage: skip + pageSize < allCuisineGroups.length,
  totalCuisines: allCuisineGroups.length,
  groups: paginatedGroups,
};

return apiSuccessResponse(res, "successful", httpCode.OK, response);
});



export const getNearestRestaurantsSimple = asyncHandler(async (req, res, next) => {

  const userId = (req as any).user?._id;
  if (!userId) {
    throw new ValidationError("User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ValidationError("User not found");
  }


  const { lat, lng, maxDistance = 10000, limit = 20, cuisine, minRating } = req.body;

  // Validate coordinates
  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }

  console.log(lat,lng);

  const nearestRestaurants = await Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat], // [longitude, latitude]
        },
        $maxDistance: maxDistance, // Distance in meters
      },
    },
    isApproved: "approved",
  })
    .populate("image")
    .populate("userId", "name email")
    .limit(limit)
    .select("-__v -distance") // Exclude the distance field from model

  // Get user's wishlist if user is authenticated
  let userWishlist = null
  if (userId) {
    userWishlist = await Wishlist.findOne({ user: userId }).select("restaurants")
  }

  // Calculate real-time distance for each restaurant based on user's current location
// Calculate real-time distance for each restaurant based on user's current location
    const restaurantsWithDistance = nearestRestaurants.map((restaurant) => {
      const calculatedDistance = calculateDistance(
        lat,
        lng,
        restaurant.location.coordinates[1],
        restaurant.location.coordinates[0],
      )

      // Check if restaurant is in user's wishlist
      const isInWishlist = userWishlist
        ? userWishlist.restaurants.some(
            (wishlistRestaurantId) => wishlistRestaurantId.toString() === (restaurant._id as Types.ObjectId).toString(),
          )
        : false

      return {
        ...restaurant.toObject(),
        calculatedDistance: Math.round(calculatedDistance * 100) / 100, // Real-time calculated distance
        distanceUnit: "km",
        isInWishlist, // Add wishlist status
      }
    })

  apiSuccessResponse(res, "successful", httpCode.OK, {
    restaurants: restaurantsWithDistance
  })


})

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}