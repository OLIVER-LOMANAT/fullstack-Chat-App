import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://fullstack-chat-2onzmxd8h-oliver-lomanats-projects.vercel.app", // Your Vercel URL
      "https://*.vercel.app"  // All Vercel deployments
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Simple root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Chat App Backend API is running!",
    endpoints: {
      auth: "/api/auth",
      messages: "/api/messages"
    }
  });
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});