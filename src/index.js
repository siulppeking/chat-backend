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
        //origin: "https://chat-emot.netlify.app",
        methods: ["GET", "POST"]
    }
});

let users = 0;

io.on('connection', (socket) => {
    users++;
    io.emit('userCount', users);
    console.log('a user connected');

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        users--;
        io.emit('userCount', users);
        console.log('user disconnected');
    });
});
