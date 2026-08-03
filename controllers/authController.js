const User = require("../models/user");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../validators/authValidator");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
const result = registerSchema.safeParse(req.body);

if (!result.success) {
    return res.status(400).json({
        errors: result.error.issues
    });
}
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
const result = loginSchema.safeParse(req.body);

if (!result.success) {
    return res.status(400).json({
        errors: result.error.issues
    });
}
        // Find the user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
};
module.exports = {
    registerUser,
    loginUser,
    getProfile
};