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
    "http://localhost:3000",      
    "http://localhost:8081",       // ✅ React Native (Expo / Android emulator)
    undefined                      // ✅ Allow undefined origin for Postman, curl, or mobile apps that don't send origin
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));
  app.use(cookieParser()); // 👈 This is required to access req.cookies
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


