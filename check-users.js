// Run this with: node check-users.js
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

async function checkUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log(`📍 URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Use the same collection name as your User model
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');

    // Check for demo users
    const demoUsers = [
      'demo.user@example.com',
      'demo.vendor@example.com',
      'muslimguide7@gmail.com'
    ];

    console.log('📋 Checking users in database:\n');
    
    for (const email of demoUsers) {
      const user = await User.findOne({ email: email.toLowerCase() });
      
      if (user) {
        console.log(`✅ Found: ${email}`);
        console.log(`   - _id: ${user._id}`);
        console.log(`   - name: ${user.name || 'N/A'}`);
        console.log(`   - role: ${user.role || 'N/A'}`);
        console.log(`   - isVerified: ${user.isVerified}`);
        console.log(`   - provider: ${user.provider || 'N/A'}`);
        console.log(`   - status: ${user.status || 'N/A'}`);
        console.log(`   - hasPassword: ${user.password ? 'Yes' : 'No'}`);
        console.log(`   - passwordLength: ${user.password ? user.password.length : 0}`);
        console.log('');
      } else {
        console.log(`❌ Not found: ${email}\n`);
      }
    }

    // Test password hash
    console.log('🔐 Testing password hash...\n');
    const testUser = await User.findOne({ email: 'demo.user@example.com' });
    if (testUser && testUser.password) {
      const bcrypt = require('bcryptjs');
      const testPassword = 'password123';
      const isValid = bcrypt.compareSync(testPassword, testUser.password);
      console.log(`Password test for 'password123': ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      
      if (!isValid) {
        console.log('\n⚠️  Password mismatch! This could mean:');
        console.log('   1. Password was double-hashed (users seeded before fix)');
        console.log('   2. Wrong password in seed data');
        console.log('\n💡 Solution: Delete existing users and re-seed them');
      }
    }

    await mongoose.connection.close();
    console.log('\n✅ Check completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();

