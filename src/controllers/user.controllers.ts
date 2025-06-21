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

  const decoded = jwt.verify(adminToken, config.ADMIN_API_TOKEN);

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

  const accesstoken = jwt.sign(
    { _id: user._id, email, role: user.role },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email, role: user.role },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("isl_admin_access_token", accesstoken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("isl_admin_refresh_token", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
  async (req: RequestWithUser, res: Response) => {
    const token = req.cookies.isl_admin_refresh_token;

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

    res.cookie("isl_admin_access_token", newAccessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    apiSuccessResponse(res, "Login successful", httpCode.OK, {
      ...user.toObject(),
      isl_admin_access_token: newAccessToken,
    });
  }
);

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

    res.clearCookie("isl_user_access_token");
    res.clearCookie("isl_user_refresh_token");
    res.clearCookie("isl_vendor_access_token");
    res.clearCookie("isl_vendor_refresh_token");
    res.clearCookie("isl_admin_access_token");
    res.clearCookie("isl_admin_refresh_token");

    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("User not found");
    }

    await BlacklistToken.create({ token: token });

    apiSuccessResponse(res, "User logged out!", httpCode.OK);
  }
);
