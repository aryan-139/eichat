require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const http = require('http');
const socketio = require('socket.io');
const userRoute = require('./routes/userRoutes');
const groupRoute = require('./routes/groupRoutes');
const messageRoute = require('./routes/messageRoutes');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8001;

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

let chatRoom = '';
let allUsers = [];

io.on('connection', (socket) => {
  console.log('A user connected with socket_id:' + socket.id);

  const CHAT_BOT = 'Chatbot';

  // Join a room
  socket.on('join_room', (data) => {
    const { userName, room } = data;
    socket.join(room);
    console.log(`${userName} joined room: ${room} with socket id: ${socket.id}`);

    let __createdtime__ = new Date().toLocaleTimeString();

    // Send message to all users that someone joined
    socket.to(room).emit('receive_message', {
      user: CHAT_BOT,
      message: `${userName} joined the room`,
      createdtime: __createdtime__,
    });

    // Send message to the user that joined
    socket.emit('receive_message', {
      user: CHAT_BOT,
      message: `Welcome to the room ${room}`,
      createdtime: __createdtime__,
    });

    // Save the user to the room
    allUsers.push({ userName, room, socketId: socket.id });
    chatRoom = room;
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });

  // Send message to room
  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    console.log(data);
    // Push message to DB (this part should have the code to save message to DB)
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
  });

  //leave the room 
  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    console.log(`${username} left room: ${room} with socket id: ${socket.id}`);
  
    let __createdtime__ = new Date().toLocaleTimeString();
  
    // Send message to all users that someone left
    socket.to(room).emit('receive_message', {
      user: CHAT_BOT,
      message: `${username} left the room`,
      createdtime: __createdtime__,
    });
  
    // Remove user from the room
    allUsers = allUsers.filter((user) => user.socketId !== socket.id);
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });
  
});


server.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});


// Routes
app.use('/user', userRoute);
app.use('/group', require('./routes/groupRoutes'));
app.use('/message', require('./routes/messageRoutes'));
