const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

let io;

const setSocketIO = (socketIO) => {
    io = socketIO;
};

// Create a task
router.post("/", protect, async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status: status || "pending",
            user: req.user.id
        });

        if (io) {
            io.to(`user:${req.user.id}`).emit("taskCreated", task);
        }

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
});

// Get all tasks for a user
router.get("/:userId", protect, async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});

// Update task status
router.put("/:id", protect, async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (io) {
            io.to(`user:${task.user}`).emit("taskUpdated", task);
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
});

module.exports = {
    router,
    setSocketIO
};