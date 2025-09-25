const axios = require("axios");

const baseUrl = "https://api.muslimcompass.io";

async function testErrorHandling() {
  console.log("🔍 Testing Error Handling...\n");

  const testCases = [
    {
      url: "/api/v1/hotels/nearest",
      method: "GET",
      expectedStatus: 400,
      description: "Missing coordinates",
    },
    {
      url: "/api/v1/hotels/nearest?lat=invalid&lng=invalid",
      method: "GET",
      expectedStatus: 400,
      description: "Invalid coordinates",
    },
    {
      url: "/api/v1/hotels/nearest?lat=999&lng=999",
      method: "GET",
      expectedStatus: 200,
      description: "Valid but extreme coordinates",
    },
    {
      url: "/api/v1/users/register",
      method: "POST",
      data: {
        name: "",
        email: "invalid-email",
        password: "123",
      },
      expectedStatus: 400,
      description: "Invalid registration data",
    },
    {
      url: "/api/v1/users/login",
      method: "POST",
      data: {
        email: "nonexistent@example.com",
        password: "wrongpassword",
      },
      expectedStatus: 401,
      description: "Invalid login credentials",
    },
    {
      url: "/api/v1/wishlist",
      method: "GET",
      headers: {
        Authorization: "Bearer invalid-token",
      },
      expectedStatus: 401,
      description: "Invalid authentication token",
    },
    {
      url: "/api/v1/nonexistent",
      method: "GET",
      expectedStatus: 404,
      description: "Non-existent endpoint",
    },
    {
      url: "/api/v1/users/register",
      method: "POST",
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword123",
        role: "invalid-role",
      },
      expectedStatus: 400,
      description: "Invalid user role",
    },
  ];

  const results = [];

  for (const testCase of testCases) {
    try {
      let response;
      const config = {
        headers: testCase.headers || { "Content-Type": "application/json" },
      };

      if (testCase.method === "GET") {
        response = await axios.get(`${baseUrl}${testCase.url}`, config);
      } else if (testCase.method === "POST") {
        response = await axios.post(
          `${baseUrl}${testCase.url}`,
          testCase.data,
          config
        );
      }

      const status = response.status;
      const isExpected = status === testCase.expectedStatus;

      results.push({
        description: testCase.description,
        expected: testCase.expectedStatus,
        actual: status,
        success: isExpected,
      });

      console.log(
        `${isExpected ? "✅" : "❌"} ${testCase.description}: Expected ${
          testCase.expectedStatus
        }, Got ${status}`
      );
    } catch (error) {
      const status = error.response?.status;
      const isExpected = status === testCase.expectedStatus;

      results.push({
        description: testCase.description,
        expected: testCase.expectedStatus,
        actual: status || "ERROR",
        success: isExpected,
      });

      console.log(
        `${isExpected ? "✅" : "❌"} ${testCase.description}: Expected ${
          testCase.expectedStatus
        }, Got ${status || "ERROR"}`
      );
    }
  }

  // Summary
  console.log("\n📊 Error Handling Test Summary:");
  console.log("================================");

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`✅ Passed: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);

  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach((f) => {
      console.log(
        `   - ${f.description}: Expected ${f.expected}, Got ${f.actual}`
      );
    });
  }

  const successRate = (successful.length / results.length) * 100;
  console.log(`\n🎯 Success Rate: ${successRate.toFixed(1)}%`);

  if (successRate < 80) {
    console.log("⚠️  Warning: Error handling success rate is below 80%");
  }
}

testErrorHandling().catch(console.error);
