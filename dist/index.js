import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDb, port } from "./config/db.config.js";
import router from "./routes/index.route.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional but good
app.use(cors());
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);
app.use("/api", router);
// protected route
connectDb()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.log("Server is Down", error);
});
// protected routes
