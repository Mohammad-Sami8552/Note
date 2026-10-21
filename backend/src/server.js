import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import noteRouter from "./routers/note_routes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rate_limiter.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const app = express();

//middleware
if (process.env.NODE_ENV != "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    })
    );
}


app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist/")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    });
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    });
});

