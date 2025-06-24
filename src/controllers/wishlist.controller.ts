import { ValidationError } from "../config/error.config";
import { httpCode } from "../config/http.config";
import { asyncHandler } from "../middleware/asyncHandler";
import { Restaurant } from "../models/restaurant.model";
import { Wishlist } from "../models/wishlist.model";
import { apiSuccessResponse } from "../utils/response";


export const addToWishlist = asyncHandler(async (req, res) => {
    const userId = (req as any).user._id;
    const { restaurantId } = req.body;
  
    // Validate restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new ValidationError("Restaurant not found");
    }
  
    // Find or create wishlist for user
    let wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, restaurants: [] });
    }
  
    // Check if already in wishlist
    if (wishlist.restaurants.includes(restaurantId)) {
      throw new ValidationError("Restaurant already in wishlist");
    }
  
    // Add to wishlist
    wishlist.restaurants.push(restaurantId);
    await wishlist.save();
  
    // Optional: Add to restaurant's inWishlists array
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $addToSet: { inWishlists: wishlist._id }
    });
  
    apiSuccessResponse(res, "Added to wishlist", httpCode.OK, wishlist);
  });

  export const removeFromWishlist = asyncHandler(async (req, res) => {
    const userId = (req as any).user._id;
    const { restaurantId } = req.body;
  
    const wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      throw new ValidationError("Wishlist not found");
    }
  
    // Remove from wishlist
    wishlist.restaurants = wishlist.restaurants.filter(
      id => id.toString() !== restaurantId.toString()
    );
    await wishlist.save();
  
    // Optional: Remove from restaurant's inWishlists array
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { inWishlists: wishlist._id }
    });
  
    apiSuccessResponse(res, "Removed from wishlist", httpCode.OK, wishlist);
  });

  export const getWishlist = asyncHandler(async (req, res) => {

    console.log("req.body?.page",req.body?.page)

    const userId = (req as any).user._id;
    const pageNumber = parseInt(req.body?.page as string) || 1;
    const pageSize = parseInt(req.body?.pageSize as string) || 4; // Default 10 items per page
    const skip = (pageNumber - 1) * pageSize;

    const wishlist = await Wishlist.findOne({ user: userId });
  
    if (!wishlist) {
      return apiSuccessResponse(res, "Wishlist retrieved", httpCode.OK, {
        restaurants: [],
        count: 0,
        totalCount: 0,
        totalPages: 0,
        currentPage: pageNumber,
        hasNextPage: false
      });
    }
  
  
  // Get paginated restaurants with population
  const paginatedRestaurants = await Restaurant.find({
    _id: { $in: wishlist.restaurants }
  })
    .skip(skip)
    .limit(pageSize)
    .populate('image')
    .sort({ createdAt: -1 })
    .lean(); // Convert to plain JavaScript objects

  // Add isInWishlist field (will be true for all since we're querying the wishlist)
  const restaurantsWithWishlistStatus = paginatedRestaurants.map(restaurant => ({
    ...restaurant,
    isInWishlist: true // Since we're querying the wishlist, all results are in wishlist
  }));

  const totalCount = wishlist.restaurants.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = skip + pageSize < totalCount;
  
  apiSuccessResponse(res, "Wishlist retrieved", httpCode.OK, {
    restaurants: restaurantsWithWishlistStatus,
    count: restaurantsWithWishlistStatus.length,
    totalCount,
    totalPages,
    currentPage: pageNumber,
    hasNextPage
  });
  });