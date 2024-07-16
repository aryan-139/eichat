import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Icon, Toolbar, Typography } from '@mui/material';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { deleteGroupByGroupID, getGroupNameByID } from '../api/groupApi';

const ChatHeader = ({ username, roomName }) => {
  const [groupName, setGroupName] = useState('');
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate();
  const firstChar = groupName.charAt(0).toUpperCase();

  //get group name from group_id
  useEffect(() => {
    console.log('Fetching group name for room:', roomName);
    const fetchGroupName = async () => {
      const response = await getGroupNameByID(roomName);
      if (response) {
        setGroupName(response.group_name);
      }
    };

    fetchGroupName();
  }, [roomName]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    const room = roomName;
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  const deleteGroup = async () => {
    const response = await deleteGroupByGroupID(roomName);
    if (response) {
      alert('Group deleted successfully');
      navigate('/', { replace: true });
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#172B4D' }}>
      <Toolbar>
      <Avatar>
      {firstChar}
      </Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', marginLeft: 2 }}>
        {groupName}
        </Typography>
      
      <Button 
        sx={{ color: 'white', marginRight:2 , borderColor: 'white', '&:hover': { backgroundColor: '#2A4365' } }} 
        onClick={deleteGroup} 
        variant="outlined"
      >
        Delete Group
      </Button>
        
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
