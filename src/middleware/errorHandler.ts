import { ErrorRequestHandler } from "express";
import { AppError } from "../config/error.config";
import { httpCode } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  if (err instanceof AppError) {
    const errorDetails = Array.isArray(err.details) ? err.details : undefined;
    const response = {
      message: err.message,
      statusCode: err.statusCode,
      success: false,
      details: errorDetails,
      isOperational: err.isOperational,
      stack: err.stack,
    };
    return res.status(err.statusCode).json(response);
  }

  if (err.name === "jsonWebTokenError" || err.name === "TokenExpiredError") {
    const response = {
      message:
        err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
      statusCode: httpCode.UNAUTHORIZED,
      success: false,
      details: undefined,
      isOperational: false,
      stack: err.stack,
    };
    return res.status(httpCode.UNAUTHORIZED).json(response);
  }

  const response = {
    message: "Internal Server Error",
    statusCode: httpCode.INTERNAL_SERVER_ERROR,
    status: false,
    details: undefined,
    isOperational: false,
    stack: err.stack,
  };
  return res.status(httpCode.INTERNAL_SERVER_ERROR).json(response);
};
