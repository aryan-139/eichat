import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { SocketContext } from '../context/SocketContext';

const ChatBox = ({ roomName, messagesReceived }) => {
  const [messages, setMessages] = useState([]);
  const socket = React.useContext(SocketContext);

  // Function to handle sending a message
  const handleSendMessage = (message) => {
    const newMessage = {
      user: 'You', 
      message,
      __createdtime__: new Date().toISOString()
    };
    setMessages([...messages, newMessage]); // Add new message to state
    socket.emit('send_message', newMessage); // Emit message to server
  };
  // Effect to listen for new messages from socket
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
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
      <ChatHeader roomName={roomName} />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </Paper>
  );
};

export default ChatBox;
