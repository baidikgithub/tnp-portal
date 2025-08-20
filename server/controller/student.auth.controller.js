// controllers/studentAuthController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.models");

// login student (no registration route)
exports.login = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    if (!regNo || !password) {
      return res.status(400).json({ message: "regNo and password are required" });
    }

    // Find student by regNo
    const student = await Student.findOne({ regNo }).select("+passwordHash");
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT Payload
    const payload = {
      id: student._id,
      regNo: student.regNo,
      role: "student"
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Update last login
    student.lastLoginAt = new Date();
    await student.save();

    // Respond (exclude sensitive data)
    const studentObj = student.toObject();
    delete studentObj.passwordHash;

    res.status(200).json({
      message: "Login successful",
      token,
      student: studentObj
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
