import { Response } from "express";
import { HTTP_CODE } from "../config/http.config";

export const apiSuccessResponse = (
  res: Response,
  message: string,
  statusCode: HTTP_CODE,
  data?: unknown
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};
