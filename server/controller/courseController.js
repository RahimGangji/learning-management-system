const Course = require("../model/Course");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const cloudinary = require("../utils/cloudinary");

const getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await Course.find();

        return new ApiResponse(
            res,
            200,
            courses,
            "All courses fetched successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Error While Fetching courses");
    }
};
const getAllPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true });

        return new ApiResponse(
            res,
            200,
            courses,
            "All published courses fetched successfully"
        );
    } catch (error) {
        return new ApiError(res, 500, "Error While Fetching courses");
    }
};
const getCourseByIdAdmin = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return new ApiError(res, 404, "Course not found");
        }
        return new ApiResponse(res, 200, course, "Course fetched successfully");
    } catch (error) {
        return new ApiError(res, 500, "Error While Fetching course");
    }
};
const getCourseByIdPublished = async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            isPublished: true,
        });
        if (!course) {
            return new ApiError(res, 404, "Course not found");
        }
        return new ApiResponse(res, 200, course, "Course fetched successfully");
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return new ApiError(res, 404, "Course not found");
        }

        if (course.image) {
            const publicId = course.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`course_images/${publicId}`);
        }

        await Course.findByIdAndDelete(req.params.id);

        return new ApiResponse(res, 200, null, "Course deleted successfully");
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const createCourse = async (req, res) => {
    try {
        const { title, description, price, isPublished } = req.body;
        const file = req.file;

        if (!title || !description || !price || !file) {
            return new ApiError(res, 400, "All fields are required");
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return new ApiError(res, 400, "Price must be a valid number");
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

        return new ApiResponse(res, 201, course, "Course created successfully");
    } catch (error) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
const editCourse = async (req, res) => {
    const { title, description, price, isPublished } = req.body;
    const file = req.file;

    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return new ApiError(res, 404, "Course not found");
        }

        if (title) course.title = title;
        if (description) course.description = description;
        if (price) {
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice)) {
                return new ApiError(res, 400, "Price must be a valid number");
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
                return new ApiError(res, 500, "Error while updating image");
            }
        }

        await course.save();

        return new ApiResponse(res, 200, course, "Course updated successfully");
    } catch (error) {
        return new ApiError(res, 500, "Internal Server");
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
