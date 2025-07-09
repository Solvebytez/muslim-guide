import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { validationResult } from "express-validator";
import { ValidationError } from "../config/error.config";
import User from "../models/user.model";
import crypto from "crypto";
import { sendOtp } from "../utils/sendOtp";
import { apiSuccessResponse } from "../utils/response";
import { httpCode } from "../config/http.config";
import bcrypt from "bcryptjs";
import { generateToken, setTokenCookie } from "../utils/sendToken";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config";
import { RequestWithUser } from "../middleware/isAuthenticated";
import { BlacklistToken } from "../models/blacklist.model";
import { Restaurant } from "../models/restaurant.model";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }

  const { email, password, name, userType } = req.body;

  const existing = await User.findOne({ email, isVerified: true });
  if (existing) {
    throw new ValidationError("User already exists");
  }
  let user = await User.findOne({ email });
  if (user && !user.isVerified) {
    await user.deleteOne();
  }

  const otp = crypto.randomInt(1000, 9999).toString();
  const otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

  await sendOtp(otp, name, email, "email-verification-template");

  user = await User.create({
    email,
    provider: "local",
    password,
    name,
    otp,
    otp_expiry,
    role: userType,
  });

  apiSuccessResponse(
    res,
    "User created. Please verify your email.",
    httpCode.CREATED
  );
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }

  const { email, otp } = req.body;

  const user = await User.findOne({ email, isVerified: false }).select(
    "+otp +otp_expiry"
  );
  if (!user) {
    throw new ValidationError("User not found");
  }

  if (user.otp !== otp) {
    throw new ValidationError("Invalid OTP");
  }

  const isOtpExpired = user.otp_expiry! < new Date();
  if (isOtpExpired) {
    throw new ValidationError("OTP expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otp_expiry = null;

  await user.save();

  apiSuccessResponse(res, "User verified!", httpCode.OK);
});

export const userLogin = asyncHandler(async (req: Request, res: Response) => {

  console.log("user login", req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }
  const { email, password, signinToken } = req.body;

  const decoded = jwt.verify(signinToken, config.APP_API_TOKEN);

  if (!decoded) {
    throw new ValidationError("Invalid token");
  }

  const user = await User.findOne({
    email: (decoded as any).email,
    isVerified: true,
  }).select("+password");
  if (!user) {
    throw new ValidationError("User not found");
  }

  if (user.password) {
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError("Invalid password");
    }
  }

  if (user.status === "blocked") {
    throw new ValidationError("User is not active");
  }

  let accesstoken = "";
  let refreshToken = "";

  if (user.role === "user") {
    accesstoken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_user_access_token"
    );
    refreshToken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_user_refresh_token"
    );

    setTokenCookie(res, "isl_user_access_token", accesstoken);
    setTokenCookie(res, "isl_user_refresh_token", refreshToken);
  }
  if (user.role === "vendor") {
    accesstoken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_vendor_access_token"
    );
    refreshToken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_vendor_refresh_token"
    );

    setTokenCookie(res, "isl_vendor_access_token", accesstoken);
    setTokenCookie(res, "isl_vendor_refresh_token", refreshToken);
  }

  apiSuccessResponse(res, "User logged in!", httpCode.OK, {
    accesstoken,
    refreshToken,
  });
});

export const userProfile = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("User not found");
    }

    apiSuccessResponse(res, "User profile!", httpCode.OK, user);
  }
);

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }
  
  const { email, password, adminToken } = req.body;

  if (adminToken !== config.ADMIN_API_TOKEN) {
    return res.status(403).json({ message: "Unauthorized admin access" });
  }

  const user = await User.findOne({ email }).select("+password");
  
  if (!user || !user.password) {
    throw new ValidationError("User not found");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new ValidationError("Invalid password");
  }

  if (user.role !== "admin") {
    throw new ValidationError("Only admin can login");
  }

  if (user.status === "blocked") {
    throw new ValidationError("User is not active");
  }

  const accesstoken = jwt.sign(
    { _id: user._id, email, role: user.role },
    config.JWT_ACCESS_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email, role: user.role },
    config.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const isProd = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

console.log("isProd", isProd,"process.env.RENDER",process.env.RENDER)

res.cookie("isl_session_marker", "1", {
  httpOnly: false,               // Middleware can read it
  secure: isProd,                // true in production
  sameSite: isProd?'none':'lax',              // ✅ Required for cross-site
  maxAge: 24 * 60 * 60 * 1000,   // 1 day
  path: "/",
  // domain: ".muslimcompass.io", // ✅ Set for root domain
});

res.cookie("isl_admin_access_token", accesstoken, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd?'none':'lax',              // ✅ Required for cross-site
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
  // domain: ".muslimcompass.io", // ✅ Set for root domain
});

res.cookie("isl_admin_refresh_token", refreshToken, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd?'none':'lax',              // ✅ Fixed here
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
  // domain: ".muslimcompass.io", // ✅ Set for root domain
});

  apiSuccessResponse(res, "User logged in!", httpCode.OK, {
    accesstoken,
    refreshToken,
  });
});

export interface DecodedToken {
  email: string;
  name: string;
  avatar: string;
  role: string;
}

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }
  const { signInToken } = req.body || {};

  if (!req.body.signInToken) {
    return res
      .status(400)
      .json({ message: "signInTokn is required", success: false });
  }

  const decoded = jwt.verify(signInToken, config.APP_API_TOKEN) as DecodedToken;

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }

  let user;

  user = await User.findOne({
    email: decoded.email,
    provider: "google",
  });

  let accesstoken = "";
  let refreshToken = "";

  if (user) {
    if (user.provider !== "google") {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    if (user.status === "blocked") {
      return res
        .status(400)
        .json({ message: "User is not active", success: false });
    }
  }

  const { email, name, avatar, role } = decoded;

  if (!user) {
    console.log("decoded...", decoded);
    user = await User.create({
      email,
      name,
      provider: "google",
      role: role,
      isVerified: true,
    });
  }

  console.log("user", user);

  if (user.role === "user") {
    accesstoken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_user_access_token"
    );
    refreshToken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_user_refresh_token"
    );

    setTokenCookie(res, "isl_user_access_token", accesstoken);
    setTokenCookie(res, "isl_user_refresh_token", refreshToken);
  }
  if (user.role === "vendor") {
    accesstoken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_vendor_access_token"
    );
    refreshToken = generateToken(
      { _id: user._id, email, role: user.role },
      "isl_vendor_refresh_token"
    );

    setTokenCookie(res, "isl_vendor_access_token", accesstoken);
    setTokenCookie(res, "isl_vendor_refresh_token", refreshToken);
  }

  apiSuccessResponse(res, "User logged in!", httpCode.OK, {
    accessToken: accesstoken,
    refreshToken: refreshToken,
    role: user.role,
  });
});

export const refreshToken = asyncHandler(
  async (req: any, res: Response) => {
    const token = req.cookies.isl_admin_refresh_token;

    console.log("token refreshToken", req.cookies.isl_admin_refresh_token);

    if (!token) {
      throw new ValidationError("Unauthorized");
    }
    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
      throw new ValidationError("Unauthorized");
    }

    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
    console.log("decoded refreshToken", decoded);

    if (!decoded) {
      throw new ValidationError("Unauthorized");
    }

    const user = await User.findById((decoded as any)._id);
    if (!user) {
      throw new ValidationError("User not found");
    }

    if (user.role !== "admin") {
      throw new ValidationError("Only admin can refresh web tokens");
    }

    const newAccessToken = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      config.JWT_ACCESS_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const isProd = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    res.cookie("isl_admin_access_token", newAccessToken, {
      httpOnly: true,
      secure: isProd,
     sameSite:isProd?"none":"lax",         // ✅ Must be "none" for cross-site
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      // domain: ".muslimcompass.io", // ✅ Set for root domain
    });
    

    apiSuccessResponse(res, "Login successful", httpCode.OK, {
      ...user.toObject(),
      isl_admin_access_token: newAccessToken,
    });
  }
);


export const allDataOverview = asyncHandler(async (req: RequestWithUser, res: Response) => {

  const userId = req.user._id;
  const user = await User.findById(userId);

  if(!user){
    throw new ValidationError("User not found");
  }

  if(user.role !== "admin"){
    throw new ValidationError("Only admin can access this route");
  }

  // Get total count of all users
const totalUsers = await User.countDocuments();

// Get count of regular users (role = "user")
const regularUserCount = await User.countDocuments({ role: "user" });

// Get count of vendor users (role = "vendor")
const vendorUserCount = await User.countDocuments({ role: "vendor" });

// You might also want admin count
const adminCount = await User.countDocuments({ role: "admin" });

// Get total count of all hotels
const totalHotels = await Restaurant.countDocuments();

// Get count of active hotels (status = "active")
const pendingHotelCount = await Restaurant.countDocuments({ isApproved: "pending" });

// Get count of inactive hotels (status = "inactive")
const activeHotelCount = await Restaurant.countDocuments({ isApproved: "approved" });

// You might also want admin count
const rejectedHotelCount = await Restaurant.countDocuments({ isApproved: "rejected" });

apiSuccessResponse(res, "All data overview", httpCode.OK, {
  user: {
    totalUsers,
  regularUserCount,
  vendorUserCount,
  // adminCount,
  },
  resturents: {
    totalHotels,
    rejectedHotelCount,  
    activeHotelCount,
    pendingHotelCount,
  }
 
})

});

export const getActiveUser = asyncHandler(async (req: RequestWithUser, res: Response) => {

  const userId = req.user._id;
  const user = await User.findById(userId);

  if(!user){
    throw new ValidationError("User not found");
  }

  if(user.role!== "admin"){
    throw new ValidationError("Only admin can access this route");
  }

  const users = await User.find();
  apiSuccessResponse(res, "All active users", httpCode.OK, {
    users
  })
  
})

export const blockUser = asyncHandler(async (req: RequestWithUser, res: Response) => {

  const userId = req.user._id;

  if(!userId){
    throw new ValidationError("User not found");
  }

  const user = await User.findById(userId);
  if(!user){
    throw new ValidationError("User not found");
  }  

  if(user.role!== "admin"){
    throw new ValidationError("Only admin can access this route");
  }

  const {blockuserId} = req.params;

  if(!blockuserId){
    throw new ValidationError("User not found");
  }

  const userToBlock = await User.findById(blockuserId);
  if(!userToBlock){
    throw new ValidationError("User not found");
  }

  userToBlock.status = "blocked";
  await userToBlock.save();

  apiSuccessResponse(res, "User blocked successfully", httpCode.OK, {
    user: userToBlock
  })  

})


export const unblockUser = asyncHandler(async (req: RequestWithUser, res: Response) => {

  const userId = req.user._id;

  if(!userId){
    throw new ValidationError("User not found");
  }

  const user = await User.findById(userId);
  if(!user){
    throw new ValidationError("User not found");
  }  

  if(user.role!== "admin"){
    throw new ValidationError("Only admin can access this route");
  }

  const {unblokedId} = req.params;

  if(!unblokedId){
    throw new ValidationError("User not found");
  }

  const userToUnBlock = await User.findById(unblokedId);
  if(!userToUnBlock){
    throw new ValidationError("User not found");
  }

  userToUnBlock.status = "active";
  await userToUnBlock.save();

  apiSuccessResponse(res, "User blocked successfully", httpCode.OK, {
    user: userToUnBlock
  })  

})


export const userLogout = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const userId = req.user._id;

    const token =
      req.cookies?.isl_admin_access_token ||
      req.cookies?.isl_user_access_token ||
      req.cookies?.isl_vendor_access_token ||
      req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      throw new ValidationError("No token found");
    }

    const isProd = process.env.NODE_ENV === "production" || process.env.RENDER === "true";
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: "none" as const,
      path: "/",
      // domain: ".muslimcompass.io",
    };

    // ✅ Clear all relevant cookies (must match how they were set)
    res.clearCookie("isl_user_access_token");
    res.clearCookie("isl_user_refresh_token");
    res.clearCookie("isl_vendor_access_token");
    res.clearCookie("isl_vendor_refresh_token");
    res.clearCookie("isl_admin_access_token", cookieOptions);
    res.clearCookie("isl_admin_refresh_token", cookieOptions);
    res.clearCookie("isl_session_marker", { ...cookieOptions, httpOnly: false });

    // ✅ Blacklist current access token
    await BlacklistToken.create({ token });

    apiSuccessResponse(res, "User logged out!", httpCode.OK);
  }
);