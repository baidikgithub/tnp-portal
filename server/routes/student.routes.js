// routes/studentAuthRoutes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controller/student.auth.controller");

router.post("/login", login);

module.exports = router;
