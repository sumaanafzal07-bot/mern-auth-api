const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;