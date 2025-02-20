const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    Lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecture",
        },
    ],
    isPublished: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
