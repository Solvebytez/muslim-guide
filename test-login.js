const axios = require('axios');

// Test configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1/email-login`;

// Test credentials
const testUsers = [
  {
    name: 'Regular User',
    email: 'demo.user@example.com',
    password: 'password123',
  },
  {
    name: 'Vendor User',
    email: 'demo.vendor@example.com',
    password: 'password123',
  },
];

async function testLogin(user) {
  try {
    console.log(`\n🧪 Testing login for: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    
    const response = await axios.post(API_URL, {
      email: user.email,
      password: user.password,
    }, {
      validateStatus: () => true, // Don't throw on any status
    });

    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200 && response.data.success) {
      console.log(`   ✅ Login successful!`);
      console.log(`   User: ${response.data.data?.user?.name || 'N/A'}`);
      console.log(`   Role: ${response.data.data?.user?.role || 'N/A'}`);
      console.log(`   Access Token: ${response.data.data?.accessToken ? '✅ Present' : '❌ Missing'}`);
      console.log(`   Refresh Token: ${response.data.data?.refreshToken ? '✅ Present' : '❌ Missing'}`);
      return true;
    } else {
      console.log(`   ❌ Login failed!`);
      console.log(`   Error: ${response.data.message || response.statusText}`);
      if (response.data.errors) {
        console.log(`   Validation Errors:`, response.data.errors);
      }
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Request failed!`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${error.response.data?.message || error.message}`);
    } else if (error.request) {
      console.log(`   ❌ No response received. Is the server running at ${BASE_URL}?`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

async function testInvalidCredentials() {
  try {
    console.log(`\n🧪 Testing invalid credentials...`);
    
    const response = await axios.post(API_URL, {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    }, {
      validateStatus: () => true,
    });

    if (response.status === 400 || response.status === 401) {
      console.log(`   ✅ Correctly rejected invalid credentials`);
      return true;
    } else {
      console.log(`   ⚠️  Unexpected response for invalid credentials: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Test failed: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Login Endpoint Tests');
  console.log(`📍 Testing endpoint: ${API_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const results = [];

  // Test valid logins
  for (const user of testUsers) {
    const result = await testLogin(user);
    results.push({ test: user.name, passed: result });
  }

  // Test invalid credentials
  const invalidTest = await testInvalidCredentials();
  results.push({ test: 'Invalid Credentials', passed: invalidTest });

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Test Summary:');
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log(`   Passed: ${passed}/${total}`);
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`   ${icon} ${result.test}`);
  });

  if (passed === total) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above.');
    process.exit(1);
  }
}

runTests();




