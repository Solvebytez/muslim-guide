import { ValidationError } from "../config/error.config";
import { asyncHandler } from "../middleware/asyncHandler";
import { Image } from "../models/image.model";
import { Restaurant } from "../models/restaurant.model";
import { deleteImagefromCloudnery } from "../utils/imageUtils";
import { apiSuccessResponse } from "../utils/response";
import { httpCode } from "../config/http.config";
import User from "../models/user.model";

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

      const pageNumber = parseInt(req.query.page as string) || 1;
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