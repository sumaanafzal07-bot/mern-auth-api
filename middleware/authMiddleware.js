const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    console.log("Authorization:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    token = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;