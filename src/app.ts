import express from "express";
import cors from "cors";
import connectDb from "./config/db.config";
import { config } from "./config/env.config";
import { errorHandler } from "./middleware/errorHandler";
import { userRoutes } from "./routes/user.routes";
import { hotelRoutes } from "./routes/addHotels.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import supportRoutes from "./routes/support.routes";
import cookieParser from "cookie-parser";
import { seedRestaurants } from "./seed/restaurant-seed-data";


const app = express();
const port = config.PORT|| 5000;

const allowedOrigins = [
  "https://admin.muslimcompass.io",
  "http://localhost:3000",   
  "http://localhost:8081", 
  "*"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      // ✅ Allow requests with no origin (native apps, curl, Postman, etc.)
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ❌ Block everything else
    console.warn(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // ✅ Required if using cookies or HTTP auth
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"], // ✅ Expose cookie headers for debugging
  optionsSuccessStatus: 200       // ✅ Some legacy browsers choke on 204
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1", userRoutes);
app.use("/api/v1", hotelRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", supportRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use(errorHandler)

connectDb().then(() => {
    app.listen(port, () => {

  //     seedRestaurants()
  // .then(() => {
  //   console.log('Seeding completed successfully!');
  //   process.exit(0);
  // })
  // .catch((error) => {
  //   console.error('Seeding failed:', error);
  //   process.exit(1);
  // });
        console.log(`Server is running on port ${port}`);
    });
});


