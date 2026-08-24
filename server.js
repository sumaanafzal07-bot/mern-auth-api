const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const { router: taskRoutes, setSocketIO } = require("./routes/taskRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const setupTaskSocket = require("./sockets/taskSocket");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running!"
    });
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.IO connection
setupTaskSocket(io);
setSocketIO(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Socket.IO is ready!");
});