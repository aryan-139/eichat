// server.js

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(cors());

// Error handling middleware
app.use(errorHandler);

// Socket.io instance with CORS settings
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected ${socket.id}');

  //join a room
  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room
    console.log(`${username} joined room: ${room} with socket id: ${socket.id}`);
    // let __createdtime__ = Date.now(); // Current timestamp
    // // Send message to all users currently in the room, apart from the user that just joined
    // socket.to(room).emit('receive_message', {
    //   message: `${username} has joined the chat room`,
    //   username: CHAT_BOT,
    //   __createdtime__,
    });
  
});

server.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
