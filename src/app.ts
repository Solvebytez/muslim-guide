import express from "express";
import cors from "cors";
import connectDb from "./config/db.config";
import { config } from "./config/env.config";
import { errorHandler } from "./middleware/errorHandler";
import { userRoutes } from "./routes/user.routes";


const app = express();
const port = config.PORT|| 5000;

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use(errorHandler)

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});