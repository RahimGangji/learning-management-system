const { z } = require("zod");

const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required").trim(),
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});
module.exports = { registerSchema, loginSchema };
