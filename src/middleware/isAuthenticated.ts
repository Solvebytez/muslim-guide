import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../config/error.config";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { BlacklistToken } from "../models/blacklist.model";
import { config } from "../config/env.config";

export interface RequestWithUser extends Request {
  user?: any;
}

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.isl_admin_access_token ||
      req.cookies?.isl_user_access_token ||
      req.cookies?.isl_vendor_access_token ||
      req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    const blacklistToken = await BlacklistToken.findOne({ token });

    if (blacklistToken) {
      throw new UnauthorizedError("Unauthorized");
    }

    // Verify the token
    const decode = jwt.verify(token, config.JWT_ACCESS_SECRET);  

    if (!decode) {
      throw new UnauthorizedError("Unauthorized");
    }

    (req as any).user = decode;
    next();
  }
);


export const isAdmin = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
      throw new UnauthorizedError("Permisson denaied! You are not an admin.");
    }

    next();
  }
);

export const isVendor = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user.role!== "vendor") {
      throw new UnauthorizedError("You are not a vendor");
    }

    next();
  }
)