import { Router } from "express";
import { loginValidator, otpVerifyValidation, registerValidator } from "../validations/user.validator";
import { adminLogin, googleLogin, refreshToken, register, userLogin, userLogout, userProfile, verifyOtp } from "../controllers/user.controllers";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();
router.post("/register", registerValidator,register);
router.post("/verify-otp", otpVerifyValidation, verifyOtp);
router.post('/login',loginValidator,userLogin)

router.get("/get-user",isAuthenticated,userProfile)
router.post('/refresh-token',refreshToken)

router.post("/google-login",googleLogin)

router.post("/admin-login",adminLogin)
router.post("/logout",isAuthenticated,userLogout)

export const userRoutes = router;