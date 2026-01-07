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
  getCuisineList,
  getNearestRestaurantsSimple,
  getPendingHotelsByUser,
  getRejectedRestaurantsForAdmin,
  rejectRestaurant,
  resturentUpdate,
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
// Allow browsing hotels by cuisine without authentication (required by Apple guidelines)
router.post("/get-hotels-by-user", getApprovedHotels);
// Allow browsing restaurants without authentication (required by Apple guidelines)
router.post(
  "/nearest-restaurants",
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

// Allow browsing cuisines without authentication (required by Apple guidelines)
router.get("/all-cuisines", getCuisineList);

router.delete(
  "/delete-restaurant/:restaurantId",
  isAuthenticated,
  deleteRestaurant
);

router.put("/update-resturent/:restaurantId", isAuthenticated, resturentUpdate);

export const hotelRoutes = router;
