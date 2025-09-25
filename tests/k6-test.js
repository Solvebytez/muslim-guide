import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export let options = {
  stages: [
    { duration: "2m", target: 10 }, // Ramp up to 10 users
    { duration: "5m", target: 10 }, // Stay at 10 users
    { duration: "2m", target: 50 }, // Ramp up to 50 users
    { duration: "5m", target: 50 }, // Stay at 50 users
    { duration: "2m", target: 100 }, // Ramp up to 100 users
    { duration: "5m", target: 100 }, // Stay at 100 users
    { duration: "2m", target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests under 500ms
    http_req_failed: ["rate<0.1"], // Error rate under 10%
    errors: ["rate<0.1"],
  },
};

export default function () {
  const baseUrl = "https://api.muslimcompass.io";

  // Test restaurant API
  let response = http.post(
    `${baseUrl}/api/v1/nearest-restaurants`,
    JSON.stringify({
      lat: 43.6532,
      lng: -79.3832,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  let success = check(response, {
    "restaurant API status is 200 or 401": (r) =>
      r.status === 200 || r.status === 401,
    "restaurant API response time < 500ms": (r) => r.timings.duration < 500,
  });
  errorRate.add(!success);

  sleep(1);

  // Test user registration
  const randomEmail = `test${Math.random()
    .toString(36)
    .substring(7)}@example.com`;
  response = http.post(
    `${baseUrl}/api/v1/register`,
    JSON.stringify({
      name: "Test User",
      email: randomEmail,
      password: "testpassword123",
      role: "user",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  success = check(response, {
    "registration API status is 200 or 400": (r) =>
      r.status === 200 || r.status === 400,
    "registration API response time < 1000ms": (r) => r.timings.duration < 1000,
  });
  errorRate.add(!success);

  sleep(2);

  // Test user login
  response = http.post(
    `${baseUrl}/api/v1/login`,
    JSON.stringify({
      email: "test@example.com",
      password: "testpassword",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  success = check(response, {
    "login API status is 200 or 401": (r) =>
      r.status === 200 || r.status === 401,
    "login API response time < 500ms": (r) => r.timings.duration < 500,
  });
  errorRate.add(!success);

  sleep(1);
}
