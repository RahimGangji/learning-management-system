const { z } = require("zod");

// Schema for creating a course (all fields required except isPublished)
const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    description: z.string().min(1, "Description is required").trim(),
    price: z
        .string()
        .min(1, "Price is required")
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
            message: "Price must be a valid non-negative number",
        }),
    isPublished: z
        .string()
        .optional()
        .transform((val) => (val === "true" ? true : false)), // Converts string to boolean
});

const getAllCoursesAdminQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, {
            message: "Page must be a positive number",
        }),
    limit: z
        .string()
        .optional()
        .default("5")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, {
            message: "Limit must be a positive number",
        }),
    search: z
        .string()
        .optional()
        .transform((val) => val?.trim()) // Trim whitespace from search term
        .refine((val) => val === undefined || val.length > 0, {
            message: "Search term cannot be empty",
        }),
});

const editCourseSchema = z
    .object({
        title: z.string().min(1, "Title is required").trim().optional(),
        description: z
            .string()
            .min(1, "Description is required")
            .trim()
            .optional(),
        price: z
            .string()
            .min(1, "Price is required")
            .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
                message: "Price must be a valid non-negative number",
            })
            .optional(),
        isPublished: z
            .string()
            .optional()
            .transform((val) => (val === "true" ? true : false)), // Converts string to boolean
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update",
    });
module.exports = {
    createCourseSchema,
    editCourseSchema,
    getAllCoursesAdminQuerySchema,
};
