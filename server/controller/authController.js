const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "User Already Exists" });
        }
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: userWithoutPassword,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        const updatedUser = user.toObject();
        delete updatedUser.password;
        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User Profile Fetched Successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const editProfile = async (req, res) => {
    const { fullName } = req.body;
    const file = req.file;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        if (fullName) {
            user.fullName = fullName;
        }
        if (file) {
            try {
                if (user.profilePicture) {
                    const publicId = user.profilePicture
                        .split("/")
                        .pop()
                        .split(".")[0];
                    await cloudinary.uploader.destroy(
                        `user_profiles/${publicId}`
                    );
                }
                const result = await cloudinary.uploader.upload(file.path);
                user.profilePicture = result.secure_url;
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error While Uploading Image",
                });
            }
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "User Profile Updated Successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
module.exports = {
    Register,
    Login,
    Logout,
    getProfile,
    editProfile,
};
