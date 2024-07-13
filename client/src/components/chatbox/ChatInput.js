import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      let new_message={user: 'You', message: message, __createdtime__: new Date().toISOString()};
      setMessage(new_message);
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
