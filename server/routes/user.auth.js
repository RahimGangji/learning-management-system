const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
    Register,
    Login,
    Logout,
    getProfile,
} = require("../controller/authController");
const Authentication = require("../middleware/Authentication");

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/profile", Authentication, getProfile);
module.exports = router;
