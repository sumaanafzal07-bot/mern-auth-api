const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6)
});

module.exports = {
    registerSchema,
    loginSchema
};