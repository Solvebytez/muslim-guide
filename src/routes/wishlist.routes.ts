import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";


const router = Router();

router.post("/add-to-wishlist",isAuthenticated, addToWishlist);
router.post("/remove-from-wishlist",isAuthenticated, removeFromWishlist);
router.post("/get-wishlist",isAuthenticated, getWishlist);


const wishlistRoutes = router;

export default wishlistRoutes;