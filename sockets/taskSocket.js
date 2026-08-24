const setupTaskSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Join user's personal room
        socket.on("joinUserRoom", (userId) => {
            socket.join(`user:${userId}`);

            console.log(
                `${socket.id} joined user room: user:${userId}`
            );
        });

        // Join a specific task room
        socket.on("joinTaskRoom", (taskId) => {
            socket.join(`task:${taskId}`);

            console.log(
                `${socket.id} joined task room: task:${taskId}`
            );
        });

        // Real-time task update
        socket.on("taskUpdated", (task) => {
            if (!task || !task._id) {
                return;
            }

            socket
                .to(`task:${task._id}`)
                .emit("taskUpdated", task);

            console.log(
                `Task ${task._id} updated and synced`
            );
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = setupTaskSocket;