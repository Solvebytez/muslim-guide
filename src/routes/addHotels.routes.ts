import { Router } from "express";

const router = Router();
import { isAuthenticated } from "../middleware/isAuthenticated";
import { hotelImage } from "../utils/uploads";
import { addHotels, getApprovedHotels, getApprovedHotelsByUser, getNearestRestaurantsSimple, getPendingHotelsByUser } from "../controllers/hotels.controllers";


router.post("/add-hotel", isAuthenticated,hotelImage.singleImage,addHotels)
router.post("/get-approved-hotels-by-user", isAuthenticated,getApprovedHotelsByUser)
router.post("/get-pending-hotels-by-user", isAuthenticated,getPendingHotelsByUser)
router.post("/get-hotels-by-user", isAuthenticated,getApprovedHotels)
router.post('/nearest-restaurants',isAuthenticated, getNearestRestaurantsSimple);

export const hotelRoutes = router;