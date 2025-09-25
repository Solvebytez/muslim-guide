const axios = require("axios");

const baseUrl = "https://api.muslimcompass.io";

async function testAPI() {
  console.log("🚀 Starting API Response Time Tests...\n");

  const endpoints = [
    {
      url: "/api/v1/nearest-restaurants",
      method: "POST",
      name: "Nearest Restaurants",
      data: {
        lat: 43.6532,
        lng: -79.3832,
      },
    },
    {
      url: "/api/v1/register",
      method: "POST",
      name: "User Registration",
      data: {
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "testpassword123",
        role: "user",
      },
    },
    {
      url: "/api/v1/login",
      method: "POST",
      name: "User Login",
      data: {
        email: "test@example.com",
        password: "testpassword",
      },
    },
    {
      url: "/api/v1/get-wishlist",
      method: "POST",
      name: "Wishlist (No Auth)",
      data: {},
    },
    {
      url: "/api/v1/all-support-ticket",
      method: "GET",
      name: "Support",
    },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const start = Date.now();
      let response;

      if (endpoint.method === "GET") {
        response = await axios.get(`${baseUrl}${endpoint.url}`);
      } else if (endpoint.method === "POST") {
        response = await axios.post(
          `${baseUrl}${endpoint.url}`,
          endpoint.data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const duration = Date.now() - start;
      const result = {
        name: endpoint.name,
        status: response.status,
        duration: duration,
        success: true,
      };

      results.push(result);

      // Consider 200, 400, 401 as successful responses (expected behavior)
      const isExpectedResponse = [200, 400, 401].includes(response.status);
      console.log(
        `${isExpectedResponse ? "✅" : "❌"} ${endpoint.name}: ${
          response.status
        } - ${duration}ms`
      );

      if (duration > 1000) {
        console.warn(`⚠️  Slow response: ${endpoint.name} took ${duration}ms`);
      }
    } catch (error) {
      const status = error.response?.status;
      const isExpectedResponse = [200, 400, 401].includes(status);

      const result = {
        name: endpoint.name,
        status: status || "ERROR",
        duration: 0,
        success: isExpectedResponse,
        error: error.message,
      };

      results.push(result);

      if (isExpectedResponse) {
        console.log(`✅ ${endpoint.name}: ${status} - ${error.message}`);
      } else {
        console.error(
          `❌ ${endpoint.name}: ${status || "ERROR"} - ${error.message}`
        );
      }
    }
  }

  // Summary
  console.log("\n📊 Test Summary:");
  console.log("================");

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const avgDuration =
    successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;

  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  console.log(`⏱️  Average Response Time: ${avgDuration.toFixed(2)}ms`);

  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach((f) => {
      console.log(`   - ${f.name}: ${f.error}`);
    });
  }

  if (avgDuration > 500) {
    console.log("\n⚠️  Warning: Average response time is above 500ms");
  }
}

testAPI().catch(console.error);
