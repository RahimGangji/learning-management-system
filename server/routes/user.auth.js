const express = require("express");
const router = express.Router();
const {
    Register,
    Login,
    Logout,
    getProfile,
    editProfile,
} = require("../controller/authController");
const Authentication = require("../middleware/Authentication");
const upload = require("../middleware/multer");

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/profile", Authentication, getProfile);
router.patch(
    "/updateProfile",
    Authentication,
    upload.single("profilePicture"),
    editProfile
);
module.exports = router;
