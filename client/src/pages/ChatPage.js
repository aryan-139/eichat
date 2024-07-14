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
  const [currentChat, setCurrentChat] = useState({username: 'Chatbot'});
  

//total chatroom users
useEffect(() => {
  socket.on('chatroom_users', (data) => {
    setRoomUsers(data);
  });

  return () => socket.off('chatroom_users');
}, [socket]);

const handleChatSelect = (chat) => {
  console.log('Chat selected:', chat);
  setCurrentChat(chat);
};


  return (
    <div>
      {/* <ChatSidebar roomUsers={roomUsers}/> */}
      <ChatDrawer username={userName} roomUsers={roomUsers} onChatSelect={handleChatSelect}/>
      {/* <ChatBox roomName={"Test Room"}/> */}
      <Paper sx={{ width: '100%', maxWidth: 1280, margin: 'auto', marginTop: 2, borderRadius: 2, marginLeft: 46 }}>
      <ChatHeader username={userName} roomName={currentChat.username} />
      <ChatUI username={userName} room={currentChat.username}/>
      <SendMessage username={userName} room={currentChat.username}/>
     
      </Paper>
    </div>
  );
};

export default ChatPage;
