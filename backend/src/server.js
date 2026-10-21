import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/note_routes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rate_limiter.js";

dotenv.config();
const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173"
})
);

app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", router);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    });
});

