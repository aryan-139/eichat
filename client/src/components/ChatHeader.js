import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const ChatHeader = ({ roomName }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          {roomName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
