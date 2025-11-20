import express from "express";
import { 
  signup, 
  login, 
  logout, 
  checkAuth, 
  updateProfile 
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Debug endpoint to check configuration
router.get("/debug-config", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  res.json({
    environment: process.env.NODE_ENV || 'development',
    isProduction: isProduction,
    hasJWTSecret: !!process.env.JWT_SECRET,
    jwtSecretLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0,
    hasMongoURI: !!process.env.MONGODB_URI,
    mongoURIShort: process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.substring(0, 20) + "..." : 
      "Not set",
    cookieSettings: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      httpOnly: true
    }
  });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.put("/profile", protectRoute, updateProfile);

export default router;