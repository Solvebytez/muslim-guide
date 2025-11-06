// Run this with: node fix-users.js
// Make sure you're in the backend directory and have .env file with MONGO_URI

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Try to load the config
let MONGO_URI;
try {
  const { config } = require('./dist/config/env.config.js');
  MONGO_URI = config.MONGO_URI;
} catch (e) {
  MONGO_URI = process.env.MONGO_URI;
}

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in environment variables');
  console.log('💡 Make sure your .env file has MONGO_URI set');
  process.exit(1);
}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function fixUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log(`📍 URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Use the same collection name as your User model
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');

    const demoUsers = [
      {
        email: 'demo.user@example.com',
        password: 'password123',
        name: 'Demo User',
        role: 'user',
      },
      {
        email: 'demo.vendor@example.com',
        password: 'password123',
        name: 'Demo Vendor',
        role: 'vendor',
      },
    ];

    console.log('🔧 Fixing demo users...\n');

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
      
      if (existingUser) {
        console.log(`Found user: ${userData.email}`);
        
        // Hash the password properly (single hash)
        const salt = bcrypt.genSaltSync(16);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        
        // Update user with correct password and ensure correct fields
        await User.updateOne(
          { email: userData.email.toLowerCase() },
          {
            $set: {
              password: hashedPassword,
              isVerified: true,
              provider: 'local',
              status: 'active',
              name: userData.name,
              role: userData.role,
            }
          }
        );
        
        console.log(`✅ Fixed user: ${userData.email}`);
        
        // Verify the fix
        const updatedUser = await User.findOne({ email: userData.email.toLowerCase() });
        const isValid = bcrypt.compareSync(userData.password, updatedUser.password);
        console.log(`   Password test: ${isValid ? '✅ Valid' : '❌ Still invalid'}\n`);
      } else {
        console.log(`❌ User not found: ${userData.email}`);
        console.log(`   Creating new user...`);
        
        const salt = bcrypt.genSaltSync(16);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        
        await User.create({
          email: userData.email.toLowerCase(),
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          isVerified: true,
          provider: 'local',
          status: 'active',
        });
        
        console.log(`✅ Created user: ${userData.email}\n`);
      }
    }

    await mongoose.connection.close();
    console.log('✅ Fix completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixUsers();

