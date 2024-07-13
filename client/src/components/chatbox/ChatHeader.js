import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { SocketContext } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ username, roomName }) => {
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate();

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    const room = roomName;
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          {roomName}
        </Typography>
        <Button color="inherit" onClick={leaveRoom}>Leave Room</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
