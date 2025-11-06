import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("userType").notEmpty().withMessage("userType is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const otpVerifyValidation = [
  body("otp")
    .notEmpty()
    .withMessage("otp is required"),

  body("otp")
    .isLength({ min: 4 })
    .withMessage("otp must be at least 4 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("signinToken")
    .notEmpty()
    .withMessage("signinToken is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const simpleLoginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];