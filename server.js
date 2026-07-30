const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

