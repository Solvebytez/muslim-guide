import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import User from "../models/user.model";

const salt = bcrypt.genSaltSync(16);

export const userSeedData = [
  {
    _id: new Types.ObjectId(),
    email: "muslimguide7@gmail.com",
    password: bcrypt.hashSync("Changeit@123", salt),
    name: "Admin User",
    role: "admin",
    isVerified: true,
    provider: "local",
    status: "active",
    userLocation: {
      type: "Point",
      coordinates: [-79.619, 43.6], // Default coordinates (Longitude, Latitude)
    },
  },
  {
    _id: new Types.ObjectId(),
    email: "demo.user@example.com",
    password: bcrypt.hashSync("password123", salt),
    name: "Demo User",
    role: "user",
    isVerified: true,
    provider: "local",
    status: "active",
    userLocation: {
      type: "Point",
      coordinates: [-79.619, 43.6], // Default coordinates (Longitude, Latitude)
    },
  },
  {
    _id: new Types.ObjectId(),
    email: "demo.vendor@example.com",
    password: bcrypt.hashSync("password123", salt),
    name: "Demo Vendor",
    role: "vendor",
    isVerified: true,
    provider: "local",
    status: "active",
    userLocation: {
      type: "Point",
      coordinates: [-79.619, 43.6], // Default coordinates (Longitude, Latitude)
    },
  },
];

export const seedUsers = async () => {
  try {
    // Clear existing users
    // await User.deleteMany({});
    // console.log('Users cleared');

    // Insert new users, skip duplicates
    // Using insertMany to avoid pre-save hook double-hashing passwords
    for (const userData of userSeedData) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        // Use insertMany with bypassDocumentValidation to skip pre-save hooks
        // since passwords are already hashed
        await User.collection.insertOne(userData);
        console.log(`User ${userData.email} seeded`);
      } else {
        console.log(`User ${userData.email} already exists, skipping`);
      }
    }
    console.log("User seeding completed");
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};
