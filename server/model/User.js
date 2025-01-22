const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "course",
            },
        ],
    },
    { versionKey: false }
);
const User = mongoose.model("user", UserSchema);
module.exports = User;
