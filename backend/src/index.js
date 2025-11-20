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

// Enhanced CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        "http://localhost:5173", 
        "https://fullstack-chat-app-rho-one.vercel.app",
        "https://fullstack-chat-app-git-main-oliver-lomanats-projects.vercel.app",
        "https://fullstack-chat-app-oliver-lomanat.vercel.app",
        /\.vercel\.app$/ 
      ];
      
      if (allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      })) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Chat App Backend API is running!",
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.json({ 
    message: "Chat App Backend API is running!",
    endpoints: {
      auth: "/api/auth",
      messages: "/api/messages",
      health: "/api/health"
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  connectDB();
});