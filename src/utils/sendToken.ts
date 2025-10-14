import jwt from "jsonwebtoken";
import { config } from "../config/env.config";

import { Response } from "express";

export type TokenType =
  | "isl_user_access_token"
  | "isl_user_refresh_token"
  | "isl_vendor_access_token"
  | "isl_vendor_refresh_token";

// Helper function to convert JWT expiration format to milliseconds
export const expiryToMs = (expiry: string): number => {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 24 * 60 * 60 * 1000; // default 1 day

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
};

export const generateToken = (user: any, tokenName: TokenType) => {
  const isExpiredTime = tokenName.includes("access_token")
    ? config.JWT_ACCESS_EXPIRES_IN
    : config.JWT_REFRESH_EXPIRES_IN;
  const constToken = tokenName.includes("access_token")
    ? config.JWT_ACCESS_SECRET
    : config.JWT_REFRESH_SECRET;

  const token = jwt.sign(user, constToken, {
    expiresIn: isExpiredTime as any,
  });

  return token;
};

export const setTokenCookie = (
  res: Response,
  tokenName: TokenType,
  token: string
) => {
  const maxAge = tokenName.includes("access_token")
    ? expiryToMs(config.JWT_ACCESS_EXPIRES_IN)
    : expiryToMs(config.JWT_REFRESH_EXPIRES_IN);

  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none", // ❗ "lax" won't work cross-site
    maxAge,
  });
};
