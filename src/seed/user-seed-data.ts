import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import User from '../models/user.model';

const salt = bcrypt.genSaltSync(16);

export const userSeedData = [
  {
    _id: new Types.ObjectId(),
    email: 'muslimguide7@gmail.com',
    password: bcrypt.hashSync('Changeit@123', salt),
    name: 'Admin User',
    role: 'admin',
    isVerified: true,
    provider: 'local',
    status: 'active',
    userLocation: {
      type: 'Point',
      coordinates: [ 43.6,-79.619,] // Default coordinates (Longitude, Latitude)
    }
  },
];

export const seedUsers = async () => {
  try {
    // Clear existing users
   // await User.deleteMany({});
   // console.log('Users cleared');

    // Insert new users
    await User.insertMany(userSeedData);
    console.log('Users seeded');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};