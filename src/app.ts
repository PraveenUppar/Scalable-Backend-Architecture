import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
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

// import swagger from "./swagger/swagger.js";
// app.use("/api/docs", swagger);

export default app;
