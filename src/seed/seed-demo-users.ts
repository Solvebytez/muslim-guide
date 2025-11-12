import connectDb from "../config/db.config";
import { seedUsers } from "./user-seed-data";

const seedDemoUsers = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await connectDb();
    console.log("✅ Database connected");

    console.log("🌱 Starting to seed demo users...");
    await seedUsers();
    console.log("✅ Demo users seeded successfully!");

    console.log("\n📝 Demo User Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Regular User:");
    console.log("  Email: demo.user@example.com");
    console.log("  Password: password123");
    console.log("  Role: user");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Vendor User:");
    console.log("  Email: demo.vendor@example.com");
    console.log("  Password: password123");
    console.log("  Role: vendor");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding demo users:", error);
    process.exit(1);
  }
};

seedDemoUsers();
