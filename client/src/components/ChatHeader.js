import React from 'react';
import { AppBar, Avatar, Button, Icon, Toolbar, Typography } from '@mui/material';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ username, roomName }) => {
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate();
  const firstChar = roomName.charAt(0).toUpperCase();

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    const room = roomName;
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#172B4D' }}>
      <Toolbar>
      <Avatar>
      {firstChar}
      </Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', marginLeft: 2 }}>
          {roomName}
        </Typography>
        <Button 
          sx={{ color: 'white', borderColor: 'white', '&:hover': { backgroundColor: '#2A4365' } }} 
          onClick={leaveRoom} 
          variant="outlined"
        >
          Leave Room
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
