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
const Message = require('./models/messages');


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


let recent_chats = [];
let chatRoom = '';
let allUsers = [];

// Fetch last 100 messages
const fetchLast100Messages = async (room) => {
  try {
    const last100messages = await Message.find({ to_user: room })
      .sort({ sent_time: -1 }) 
      .limit(100); 
  
    return last100messages; 
  } catch (error) {
    console.error('Error fetching last 100 messages:', error);
    throw error; 
  }
};


io.on('connection', (socket) => {
  console.log('A user connected with socket_id:' + socket.id);

  const CHAT_BOT = 'Chatbot';

  // Join a room
  socket.on('join_room', (data) => {
    const { userName, room } = data;
    //check if already present in the room
    if(allUsers.some(user => user.userName === userName && user.room === room)){
      console.log(`${userName} already present in room: ${room}`);
      socket.emit('receive_message', {
        user: CHAT_BOT,
        message: `You are already present in the room ${room}`,
        createdtime: new Date().toLocaleTimeString(),
      });
    }
    else{
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

    // Fetch last 100 messages
    fetchLast100Messages(room)
      .then((last100messages) => {
        socket.emit('receive_group_chats', last100messages);
      })
      .catch((error) => {
        console.error('Error fetching last 100 messages:', error);
      });
  }
  });

  // Send message to room
  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    console.log(data);
    const newMessage={
      from_user: data.user,
      to_user: room,
      message: message,
      sent_time: data.createdtime,
    };
    console.log(newMessage);
    const messageDB =new Message(newMessage);
    try{
      messageDB.save();
    }
    catch(err){
      console.log("message not saved");
    }
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

  // Get recent chats
  socket.on('get_recent_chats', async({uid})=>{
    recent_chats=await Message.find({ $or: [ { from_user: uid }, { to_user: uid } ] })
    .sort({ sent_time: -1 })
    .limit(10);
    socket.emit('receive_recent_chats', recent_chats);
  })

  // Disconnect
  socket.on('disconnect',()=>{
    console.log('User disconnected from the chat');
    allUsers = allUsers.filter((user) => user.socketId !== socket.id);
    chatRoomUsers = allUsers.filter((user) => user.room === chatRoom);
    socket.to(chatRoom).emit('chatroom_users', chatRoomUsers);
    socket.to(chatRoom).emit('receive_message', {
      user: CHAT_BOT,
      message: `A user left the room`,
      createdtime: new Date().toLocaleTimeString(),
    });
  })
  
});


server.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});


// Routes
app.use('/user', userRoute);
app.use('/group', require('./routes/groupRoutes'));
app.use('/message', require('./routes/messageRoutes'));
