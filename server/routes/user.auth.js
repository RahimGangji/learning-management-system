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
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validation/authValidation");

router.post("/register", validate(registerSchema), Register);
router.post("/login", validate(loginSchema), Login);
router.get("/logout", Logout);
router.get("/profile", Authentication, getProfile);
router.patch(
    "/updateProfile",
    Authentication,
    upload.single("profilePicture"),
    editProfile
);
module.exports = router;
