import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Logger from "./logs/Logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Todo Server is running...");
});

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import todoRoutes from "./routes/todoRoutes.js";
app.use("/api/todo", todoRoutes);

import swagger from "./swagger/swagger.js";
app.use("/api/docs", swagger);

app.listen(port, () => {
  connectDB();
  console.log(`Todo Server running on port ${port}`);
  Logger.info(`Todo Server running on port ${port}`);
});
