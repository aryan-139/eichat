import React, { useEffect, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Box, Paper, Typography } from '@mui/material';

const ChatUI = ({ username, room }) => {
  const socket = React.useContext(SocketContext);
  const [messageArray, setMessageArray] = React.useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log('Received message:', data);
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [socket]);

  // Fetch last 100 messages
  useEffect(() => {
    socket.on('receive_group_chats', (chats) => {
      const formattedChats = chats.map((chat) => ({
        user: chat.from_user,
        message: chat.message,
        createdtime: chat.sent_time,
      }));
      console.log(formattedChats);
      setMessageArray(formattedChats.reverse());
    });

    return () => socket.off('receive_group_chats');
  }, [socket]);

  // Scroll to bottom when messageArray changes
  useEffect(() => {
    scrollToBottom();
  }, [messageArray]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <Box sx={{ padding: 7 }}>
      <Box sx={{ maxHeight: '70vh', overflowY: 'auto', marginBottom: 2, minHeight: '65vh' }}>
        {messageArray.map((message, index) => {
          const isOwnMessage = message.user === username;
          return (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', marginBottom: 1 }}>
              <Paper sx={{ padding: 1, backgroundColor: isOwnMessage ? '#cce5ff' : '#f1f1f1', maxWidth: '80%' }}>
                <Typography variant="body2">
                  <strong>{isOwnMessage ? 'You' : message.user}:</strong> {message.message}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                  {message.createdtime}
                </Typography>
              </Paper>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatUI;
