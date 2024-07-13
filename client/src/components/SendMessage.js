import React from 'react';
import { SocketContext } from '../context/SocketContext';
import { Box, TextField, Button } from '@mui/material';

const SendMessage = ({ username, room }) => {
  const [inputText, setInputText] = React.useState('');
  const socket = React.useContext(SocketContext);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText) {
      const user = username;
      socket.emit('send_message', {
        user,
        room,
        message: inputText,
        createdtime: new Date().toLocaleTimeString(),
      });
      setInputText('');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', padding: 2, bottom: 0, backgroundColor: 'white'  }}>
      <TextField fullWidth variant="outlined" value={inputText} onChange={handleInputChange} placeholder="Type your message..." />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>Send</Button>
    </Box>
  );
};

export default SendMessage;
