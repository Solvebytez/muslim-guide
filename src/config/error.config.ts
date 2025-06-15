import { httpCode,HTTP_CODE  } from "./http.config";


export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: HTTP_CODE,
    public details?: unknown|null,
    public success: boolean = false,   
    public isOperational: boolean = false,  
    public stack?: any,    
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
    this.details = details;
    this.stack = stack; 
    this.isOperational = true;   
    Error.captureStackTrace(this, this.constructor); // Good for keeping stack trace clean
  }
}


export class ValidationError extends AppError {
  constructor(message="Validation Error", details?: unknown) {
    super(message, httpCode.BAD_REQUEST, details);    
  }
}

export class NotFoundError extends AppError {
  constructor(message: "Not Found", statusCode=httpCode.NOT_FOUND, details: unknown) {
    super(message, statusCode, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message= "Bad Request", details?: unknown) {
    super(message,  httpCode.BAD_REQUEST, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: "Forbidden", statusCode=httpCode.FORBIDDEN, details: unknown) {
    super(message, statusCode, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message= "Unauthorized", statusCode=httpCode.UNAUTHORIZED, details?: unknown) {
    super(message, statusCode, details);
  }
}