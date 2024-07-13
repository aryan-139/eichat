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

let chatRoom='';
let allUsers=[];

io.on('connection', (socket) => {
  console.log('A user connected with socket_id:'+ socket.id);

const CHAT_BOT='Chatbot';

//join a room
socket.on('join_room', (data) => {
  const { userName, room } = data; // Data sent from client when join_room event emitted
  socket.join(room); // Join the user to a socket room
  console.log(`${userName} joined room: ${room} with socket id: ${socket.id}`);

  let __createdtime__ = new Date().toLocaleTimeString();
  
  //send message to all users that someone joined
  socket.to(room).emit('receive_message',{
    user: CHAT_BOT,
    message: `${userName} joined the room`,
    createdtime: __createdtime__
  })

  //send message to the user that joined
  socket.emit('receive_message',{
    user: CHAT_BOT,
    message: `Welcome to the room ${room}`,
    createdtime: __createdtime__
  })

  //save the user to the room 
  allUsers.push({userName, room, socketId: socket.id});
  chatRoom=room;
  chatRoomUsers = allUsers.filter((user) => user.room === room);
  socket.to(room).emit('chatroom_users', chatRoomUsers);
  socket.emit('chatroom_users', chatRoomUsers);
 });

 socket.on('send_message', (data) => {
  const { message, username, room, __createdtime__ } = data;
  console.log(data);
  //push message to DB
  io.in(room).emit('receive_message', data); // Send to all users in room, including sender
});
});

server.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
