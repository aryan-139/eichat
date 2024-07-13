import React from 'react';
import { useLocation } from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';
import { useState, useEffect } from 'react';
import ChatDrawer from '../components/ChatDrawer';
import ChatBox from '../components/ChatBox';
import ChatUI from '../components/ChatUI';
import SendMessage from '../components/SendMessage';
import ChatHeader from '../components/chatbox/ChatHeader';
import { Paper } from '@mui/material';
import ChatSidebar from '../components/ChatSidebar';

const ChatPage = () => {
  const location = useLocation();
  const { userName, room } = location.state || {};
  const socket=React.useContext(SocketContext);
  const [roomUsers, setRoomUsers] = useState([]);

//total chatroom users
useEffect(() => {
  socket.on('chatroom_users', (data) => {
    setRoomUsers(data);
  });

  return () => socket.off('chatroom_users');
}, [socket]);



  return (
    <div>
      {/* <ChatSidebar roomUsers={roomUsers}/> */}
      <ChatDrawer roomUsers={roomUsers}/>
      {/* <ChatBox roomName={"Test Room"}/> */}
      <Paper sx={{ width: '100%', maxWidth: 1280, margin: 'auto', marginTop: 2, borderRadius: 2, marginLeft: 46 }}>
      <ChatHeader username={userName} roomName={room} />
      <ChatUI username={userName} room={room}/>
      <SendMessage username={userName} room={room}/>
     
      </Paper>
    </div>
  );
};

export default ChatPage;
