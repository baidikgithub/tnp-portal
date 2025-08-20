// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import connectDB from "./config/dbconfig.js";
import studentRoutes from "./routes/student.routes.js";
import Student from './models/student.models.js'

(async () => {
  const hashed = await bcrypt.hash("SMIT@123", 10);
  await Student.updateMany(
    { passwordHash: { $exists: false } }, 
    { $set: { passwordHash: hashed } }
  );
  console.log("✅ Default password applied to all");
})();

dotenv.config();

// =============================
// Initialize App
// =============================
const app = express();

// =============================
// Middleware
// =============================
app.use(express.json()); // parse JSON body
app.use(cors());
app.use(morgan("dev"));

// =============================
// Routes
// =============================
app.use("/api/students", studentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("TNP Management Portal API is running...");
});

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
