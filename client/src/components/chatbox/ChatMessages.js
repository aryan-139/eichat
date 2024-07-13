import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ChatMessages = ({ messages }) => {
  return (
    <Box sx={{ height: '70vh', overflowY: 'scroll', padding: 2 }}>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {msg.user}
                </Typography>
              }
              secondary={msg.message}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatMessages;
