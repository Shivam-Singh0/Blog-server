import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

import connectDB from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


app.use("/api/posts", blogRoutes);
app.use("/api/auth", userRoutes);

app.listen("5000", () => {
    console.log("Server is running on port 5000");
})
