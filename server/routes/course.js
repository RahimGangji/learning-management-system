const express = require("express");
const router = express.Router();

const {
    getAllCoursesAdmin,
    getAllPublishedCourses,
    getCourseByIdAdmin,
    getCourseByIdPublished,
    deleteCourseById,
    createCourse,
    editCourse,
} = require("../controller/courseController");
const Authentication = require("../middleware/Authentication");
const restricTo = require("../middleware/restrictTo");
const upload = require("../middleware/multer");
const validate = require("../middleware/validate");
const {
    createCourseSchema,
    editCourseSchema,
} = require("../validation/courseValidation");
router.get("/admin", Authentication, restricTo("admin"), getAllCoursesAdmin);
router.get("/published", getAllPublishedCourses);
router.get(
    "/admin/:id",
    Authentication,
    restricTo("admin"),
    getCourseByIdAdmin
);
router.get("/published/:id", getCourseByIdPublished);
router.delete(
    "/delete/:id",
    Authentication,
    restricTo("admin"),
    deleteCourseById
);
router.post(
    "/",
    Authentication,
    restricTo("admin"),
    upload.single("image"),
    validate(createCourseSchema),
    createCourse
);
router.patch(
    "/editcourse/:id",
    Authentication,
    restricTo("admin"),
    upload.single("image"),
    validate(editCourseSchema),
    editCourse
);

module.exports = router;
