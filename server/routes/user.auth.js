const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Register, Login } = require("../controller/authController");

router.post("/register", Register);
router.post("/login", Login);
module.exports = router;
