import { Router } from "express";

const router = Router();
import { isAuthenticated } from "../middleware/isAuthenticated";
import { hotelImage } from "../utils/uploads";
import {
  addHotels,
  approveRestaurant,
  deleteRestaurant,
  getAllPendingRestaurantsForAdmin,
  getApprovedHotels,
  getApprovedHotelsByUser,
  getApprovedRestaurantsForAdmin,
  getNearestRestaurantsSimple,
  getPendingHotelsByUser,
  getRejectedRestaurantsForAdmin,
  rejectRestaurant,
} from "../controllers/hotels.controllers";

router.post("/add-hotel", isAuthenticated, hotelImage.singleImage, addHotels);
router.post(
  "/get-approved-hotels-by-user",
  isAuthenticated,
  getApprovedHotelsByUser
);
router.post(
  "/get-pending-hotels-by-user",
  isAuthenticated,
  getPendingHotelsByUser
);
router.post("/get-hotels-by-user", isAuthenticated, getApprovedHotels);
router.post(
  "/nearest-restaurants",
  isAuthenticated,
  getNearestRestaurantsSimple
);

router.get(
  "/pending-restaureants",
  isAuthenticated,
  getAllPendingRestaurantsForAdmin
);
router.get(
  "/all-approved-restaureants",
  isAuthenticated,
  getApprovedRestaurantsForAdmin
);
router.get(
  "/all-rejected-restaureants",
  isAuthenticated,
  getRejectedRestaurantsForAdmin
);

router.put(
  "/approve-restaurant/:restaurantId",
  isAuthenticated,
  approveRestaurant
);
router.put(
  "/restaurant-reject/:restaurantId",
  isAuthenticated,
  rejectRestaurant
);

router.delete(
  "/delete-restaurant/:restaurantId",
  isAuthenticated,
  deleteRestaurant
)

export const hotelRoutes = router;
