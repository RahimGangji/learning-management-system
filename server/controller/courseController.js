const Course = require("../model/Course");
const cloudinary = require("../utils/cloudinary");

const getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            success: true,
            data: courses,
            message: "All courses fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Fetching courses",
        });
    }
};
const getAllPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true });
        res.status(200).json({
            success: true,
            data: courses,
            message: "All published courses fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Fetching published courses",
        });
    }
};
const getCourseByIdAdmin = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).json({
            success: true,
            data: course,
            message: "Course fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Fetching course",
        });
    }
};
const getCourseByIdPublished = async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            isPublished: true,
        });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or not published",
            });
        }

        res.status(200).json({
            success: true,
            data: course,
            message: "Course fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Fetching course",
        });
    }
};
const deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (course.image) {
            const publicId = course.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`course_images/${publicId}`);
        }

        await Course.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Deleting Course",
        });
    }
};
const createCourse = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);

        const { title, description, price, isPublished } = req.body;
        const file = req.file;

        if (!title || !description || !price || !file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid number",
            });
        }

        const imageUrl = req.file.path; // Use the URL from CloudinaryStorage

        const course = new Course({
            title,
            description,
            price: parsedPrice,
            image: imageUrl,
            isPublished: isPublished === "true" ? true : false, // Handle string-to-boolean conversion
        });

        await course.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        console.error("Create Course Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
const editCourse = async (req, res) => {
    const { title, description, price, isPublished } = req.body;
    const file = req.file;

    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (title) course.title = title;
        if (description) course.description = description;
        if (price) {
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice)) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be a valid number",
                });
            }
            course.price = parsedPrice;
        }
        if (isPublished !== undefined)
            course.isPublished = isPublished === "true" ? true : false;

        if (file) {
            try {
                if (course.image) {
                    const previousPublicId = course.image
                        .split("/")
                        .slice(-1)[0]
                        .split(".")[0];
                    const fullPublicId = `course_images/${previousPublicId}`;
                    await cloudinary.uploader.destroy(fullPublicId);
                }

                course.image = req.file.path;
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error while updating image",
                    error: error.message,
                });
            }
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
module.exports = {
    getAllCoursesAdmin,
    getAllPublishedCourses,
    getCourseByIdAdmin,
    getCourseByIdPublished,
    deleteCourseById,
    createCourse,
    editCourse,
};
