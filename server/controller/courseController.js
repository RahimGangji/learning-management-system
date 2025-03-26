const Course = require("../model/Course");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const AsyncHandler = require("../utils/AsyncHandler");
const cloudinary = require("../utils/cloudinary");
const {
    getAllCoursesAdminQuerySchema,
    getAllPublishedCoursesQuerySchema,
} = require("../validation/courseValidation");

const getCourseByIdAdmin = AsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    return new ApiResponse(res, 200, course, "Course fetched successfully");
});

const getCourseByIdPublished = AsyncHandler(async (req, res) => {
    const course = await Course.findOne({
        _id: req.params.id,
        isPublished: true,
    });
    if (!course) {
        throw new ApiError(404, "Course not found or not published");
    }
    return new ApiResponse(res, 200, course, "Course fetched successfully");
});

const deleteCourseById = AsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    if (course.image) {
        const publicId = course.image.split("/").pop().split(".")[0];
        await cloudinary.uploader
            .destroy(`course_images/${publicId}`)
            .catch((err) => {
                throw new ApiError(
                    500,
                    `Failed to delete course image: ${err.message}`
                );
            });
    }

    await Course.findByIdAndDelete(req.params.id);
    return new ApiResponse(res, 200, null, "Course deleted successfully");
});

const createCourse = AsyncHandler(async (req, res) => {
    console.log("test");
    const { title, description, price, isPublished } = req.body;
    const file = req.file;

    if (!req.file || !req.file.buffer) {
        throw new ApiError(400, "Please upload an image for the course");
    }

    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: "course_images",
                public_id: `course_${Date.now()}`,
                format: "jpg",
            },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
    });

    const imageUrl = req.file.path;
    const course = new Course({
        title,
        description,
        price: parseFloat(price),
        image: uploadResult.secure_url,
        isPublished: isPublished,
    });

    await course.save();
    return new ApiResponse(res, 201, course, "Course created successfully");
});

const editCourse = AsyncHandler(async (req, res) => {
    const { title, description, price, isPublished } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (price) {
        course.price = parseFloat(price);
    }
    if (isPublished !== undefined) {
        course.isPublished = isPublished;
    }

    if (req.file && req.file.buffer) {
        if (course.image) {
            const previousPublicId = course.image
                .split("/")
                .pop()
                .split(".")[0];
            const fullPublicId = `course_images/${previousPublicId}`;
            await cloudinary.uploader.destroy(fullPublicId).catch((err) => {
                throw new ApiError(
                    500,
                    `Failed to delete previous image: ${err.message}`
                );
            });
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "course_images",
                    public_id: `course_${req.params.id}_${Date.now()}`,
                    format: "jpg",
                },
                (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(req.file.buffer);
        });
        course.image = uploadResult.secure_url;
    }

    await course.save();
    return new ApiResponse(res, 200, course, "Course updated successfully");
});

const getAllCoursesAdmin = AsyncHandler(async (req, res) => {
    const { page, limit, search } = getAllCoursesAdminQuerySchema.parse(
        req.query
    );

    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
        query.title = { $regex: new RegExp(search, "i") };
    }
    const totalCourses = await Course.countDocuments(query);
    const courses = await Course.find(query).skip(skip).limit(limit);

    const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
        hasNextPage: page < Math.ceil(totalCourses / limit),
        hasPrevPage: page > 1,
    };

    return new ApiResponse(
        res,
        200,
        { courses, pagination },
        "All courses fetched successfully"
    );
});
const getAllPublishedCourses = AsyncHandler(async (req, res) => {
    const { page, limit, search, sortDirection, sortField } =
        getAllPublishedCoursesQuerySchema.parse(req.query);
    const skip = (page - 1) * limit;
    let query = { isPublished: true };
    if (search) {
        query.title = { $regex: new RegExp(search, "i") };
    }
    const sortOption = {
        [sortField]: sortDirection == "asc" ? 1 : -1,
    };
    const totalCourses = await Course.countDocuments(query);
    const courses = await Course.find(query)
        .collation({ locale: "en", strength: 2 })
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
        hasNextPage: page < Math.ceil(totalCourses / limit),
        hasPrevPage: page > 1,
    };
    return new ApiResponse(
        res,
        200,
        { courses, pagination },
        "All published courses fetched successfully"
    );
});

module.exports = {
    getAllCoursesAdmin,
    getAllPublishedCourses,
    getCourseByIdAdmin,
    getCourseByIdPublished,
    deleteCourseById,
    createCourse,
    editCourse,
};
