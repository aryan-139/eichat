import React, { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Box, Paper, Typography } from '@mui/material';

const ChatUI = ({ username, room }) => {
  const socket = React.useContext(SocketContext);
  const [messageArray, setMessageArray] = React.useState([]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log('Received message:', data);
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [socket]);

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
      </Box>
    </Box>
  );
};

export default ChatUI;
