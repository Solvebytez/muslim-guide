import jwt from "jsonwebtoken";
import { config } from "../config/env.config";

import { Response } from "express";

export type TokenType =
  | "isl_user_access_token"
  | "isl_user_refresh_token"
  | "isl_vendor_access_token"
  | "isl_vendor_refresh_token";

export const generateToken = (user: any, tokenName: TokenType) => {
  const isExpiredTime = tokenName.includes("access_token") ? "1d" : "7d";
  const constToken = tokenName.includes("access_token")
    ? config.JWT_ACCESS_SECRET
    : config.JWT_REFRESH_SECRET;

  const token = jwt.sign(user, constToken, {
    expiresIn: isExpiredTime,
  });

  return token;
};

export const setTokenCookie = (
  res: Response,
  tokenName: TokenType,
  token: string
) => {
  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none", // ❗ "lax" won't work cross-site
    maxAge:
      tokenName === "isl_user_access_token"
        ? 60 * 60 * 24 * 1000
        : 60 * 60 * 24 * 7 * 1000,
  });
};
