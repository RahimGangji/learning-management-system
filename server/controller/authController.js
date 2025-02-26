const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return new ApiError(res, 400, "User Already Exists");
        }
        if (!fullName || !email || !password) {
            return ApiError(res, 400, "Please fill all the fields");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        return new ApiResponse(
            res,
            201,
            userWithoutPassword,
            "User Registered Successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return new ApiError(res, 400, "Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new ApiError(res, 400, "Invalid Credentials");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        const updatedUser = user.toObject();
        delete updatedUser.password;
        return new ApiResponse(
            res,
            200,
            updatedUser,
            "User Logged In Successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const Logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return new ApiResponse(res, 200, null, "User Logged Out Successfully");
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return new ApiError(res, 404, "User Not Found");
        }
        return new ApiResponse(
            res,
            200,
            user,
            "User Profile Fetched Successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const editProfile = async (req, res) => {
    const { fullName } = req.body;
    const file = req.file;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return ApiError(res, 404, "User Not Found");
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (file) {
            try {
                // Delete the previous profile picture if it exists
                if (user.profilePicture) {
                    const previousPublicId = user.profilePicture
                        .split("/")
                        .slice(-1)[0] // Get the last part of the URL
                        .split(".")[0]; // Remove the extension
                    const fullPublicId = `user_profiles/${previousPublicId}`;
                    await cloudinary.uploader.destroy(fullPublicId);
                }

                // Use the URL provided by CloudinaryStorage (already uploaded to user_profiles)
                user.profilePicture = req.file.path;
            } catch (error) {
                return new ApiError(res, 500, "Error while updating image");
            }
        }

        await user.save();

        return new ApiResponse(
            res,
            200,
            user,
            "User Profile Updated Successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
module.exports = {
    Register,
    Login,
    Logout,
    getProfile,
    editProfile,
};
