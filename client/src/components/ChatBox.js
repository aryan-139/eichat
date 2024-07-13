import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import ChatHeader from './chatbox/ChatHeader';
import ChatMessages from './chatbox/ChatMessages';
import ChatInput from './chatbox/ChatInput';
import { SocketContext } from '../context/SocketContext';

const ChatBox = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const socket = React.useContext(SocketContext);
  const [messagesReceived, setMessagesReceived] = useState([]);

  // Function to handle sending a message
  const handleSendMessage = (message) => {
    const newMessage = {
      user: 'You', 
      message,
      __createdtime__: new Date().toISOString()
    };
    setMessages([...messages, newMessage]); 
    socket.emit('send_message', newMessage); 
  };

 //receives message from the sockets
 useEffect(() => {
    socket.on('receive_message', (data) => {
    console.log(data);
    setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.user,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  // Effect to handle messagesReceived prop changes
  useEffect(() => {
    if (messagesReceived && messagesReceived.length > 0) {
      messagesReceived.forEach((message) => {
        handleSendMessage(message.message); // Call handleSendMessage for each message received
      });
    }
  }, [messagesReceived]);

  return (
    <Paper sx={{ width: '100%', maxWidth: 1280, margin: 'auto', marginTop: 2, borderRadius: 2, marginLeft: 46 }}>
     
    </Paper>
  );
};

export default ChatBox;
