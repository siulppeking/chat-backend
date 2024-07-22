const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Serve the frontend files
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
