import React from 'react';
import { useLocation } from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';
import { useState, useEffect } from 'react';
import ChatDrawer from '../components/ChatDrawer';
import ChatBox from '../components/chatbox/ChatBox';
import ChatUI from '../components/ChatUI';
import SendMessage from '../components/SendMessage';
import ChatHeader from '../components/ChatHeader';
import { Paper } from '@mui/material';
import ChatSidebar from '../components/chatbox/ChatSidebar';

const ChatPage = () => {
  const location = useLocation();
  const { userName, room } = location.state || {};
  const socket=React.useContext(SocketContext);
  const [roomUsers, setRoomUsers] = useState([]);

//total chatroom users right now
useEffect(() => {
  socket.on('chatroom_users', (data) => {
    setRoomUsers(data);
  });

  return () => socket.off('chatroom_users');
}, [socket]);



  return (
    <div>
      
      <ChatDrawer username={userName} roomUsers={roomUsers}/>
      


      {/**TRY ADDING A STATE VARIABLE AND TEST IF ON CHANGING THE STATE VARIABLE THE ROOM CHANGE HAPPENS */}
      <Paper sx={{ width: '90%', maxWidth: 1280, margin: 'auto', marginTop: 0, borderRadius: 2, marginLeft: 52, marginRight:300 }}>
      <ChatHeader username={userName} roomName={room} />
      <ChatUI username={userName} room={room}/>
      <SendMessage username={userName} room={room}/>
     
      </Paper>
    </div>
  );
};

export default ChatPage;
