import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET is missing in environment variables");
      return null; // Return null instead of throwing
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const isProduction = process.env.NODE_ENV === "production";
    
    console.log(`Generating token for user ${userId} in ${isProduction ? 'production' : 'development'}`);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return token;
  } catch (error) {
    console.log("Error generating token:", error.message);
    return null; // Return null on error instead of throwing
  }
};