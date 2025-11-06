import { Router } from "express";
import {
  loginValidator,
  otpVerifyValidation,
  registerValidator,
  simpleLoginValidator,
} from "../validations/user.validator";
import {
  adminLogin,
  allDataOverview,
  blockUser,
  getActiveUser,
  googleLogin,
  refreshToken,
  register,
  simpleLogin,
  unblockUser,
  userLogin,
  userLogout,
  userProfile,
  verifyOtp,
} from "../controllers/user.controllers";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { hotelImage } from "../utils/uploads";
import { ValidationError } from "../config/error.config";

const router = Router();
router.post("/register", registerValidator, register);
router.post("/verify-otp", otpVerifyValidation, verifyOtp);
router.post("/login", loginValidator, userLogin);
router.post("/email-login", simpleLoginValidator, simpleLogin);

router.get("/get-user", isAuthenticated, userProfile);

router.post("/refresh-token", refreshToken);

router.post("/google-login", googleLogin);

router.get("/data-overview", isAuthenticated, allDataOverview);

router.get("/get-active-users", isAuthenticated, getActiveUser);

router.put("/block-user/:blockuserId", isAuthenticated, blockUser);
router.put("/unblock-user/:unblokedId", isAuthenticated, unblockUser);

router.post("/admin-login", adminLogin);
router.post("/logout", isAuthenticated, userLogout);

export const userRoutes = router;
