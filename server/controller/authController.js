const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const AsyncHandler = require("../utils/AsyncHandler");

// Register API
const Register = AsyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "User already exists");
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
        "User registered successfully"
    );
});

// Login API
const Login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
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
        "User logged in successfully"
    );
});

// Logout API
const Logout = AsyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
    });

    return new ApiResponse(res, 200, null, "User logged out successfully");
});

// Get Profile API
const getProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return new ApiResponse(res, 200, user, "User profile fetched successfully");
});

// Edit Profile API
const editProfile = AsyncHandler(async (req, res) => {
    const { fullName } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (fullName) {
        user.fullName = fullName;
    }

    if (req.file && req.file.buffer) {
        if (user.profilePicture) {
            const previousPublicId = user.profilePicture
                .split("/")
                .slice(-1)[0]
                .split(".")[0];
            const fullPublicId = `user_profiles/${previousPublicId}`;
            await cloudinary.uploader.destroy(fullPublicId).catch((err) => {
                throw new ApiError(
                    500,
                    "Failed to delete previous profile picture"
                );
            });
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "user_profiles",
                    public_id: `user_${req.user.id}_${Date.now()}`,
                    format: "png",
                },
                (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(req.file.buffer);
        });
        user.profilePicture = uploadResult.secure_url;
    }

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return new ApiResponse(
        res,
        200,
        updatedUser,
        "User profile updated successfully"
    );
});

module.exports = {
    Register,
    Login,
    Logout,
    getProfile,
    editProfile,
};
