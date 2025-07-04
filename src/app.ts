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


const app = express();
const port = config.PORT|| 5000;

const allowedOrigins = [
  "https://admin.muslimcompass.io",
  "http://localhost:3000",                  // ✅ Local dev frontend
  "http://localhost:8081",                  // Optional mobile dev
 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // ✅ Allow Postman/mobile apps
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // ✅ REQUIRED for cookie sharing
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"], // ✅ Optional: helps with debugging cookies
  optionsSuccessStatus: 200       // ✅ Prevents legacy browser preflight issues
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
        console.log(`Server is running on port ${port}`);
    });
});


