import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider } from '@mui/material';
import theme from './utils/Theme';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './context/SocketContext';

const App = () => {
  const socket=React.useContext(SocketContext);
  const [userName, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();
  const handleJoin = () => {
    console.log('Joining room:', room, 'with userName:', userName);
    if (room !== '' && userName !== '') {
      socket.emit('join_room', { userName, room });
    }
    // Redirect to /chat
    navigate('/chat', { state: { userName, room } });
  };

  const handleCreateRoom = () => {
    console.log('Creating a new room');
  };

  const availableRooms=[{group_id: 'room1', group_name:'Mathematics Grade1'}, {group_id: 'room2', group_name:'Mathematics Grade2'}, {group_id: 'room3', group_name:'Mathematics Grade3'}, {group_id: 'room4', group_name:'Mathematics Grade4'}, {group_id: 'room5', group_name:'Mathematics Grade5'}, {group_id: 'room6', group_name:'Mathematics Grade6'}, {group_id: 'room7', group_name:'Mathematics Grade7'}, {group_id: 'room8', group_name:'Mathematics Grade8'}, {group_id: 'room9', group_name:'Mathematics Grade9'}, {group_id: 'room10', group_name:'Mathematics Grade10'}, {group_id: 'room11', group_name:'Mathematics Grade11'}, {group_id: 'room12', group_name:'Mathematics Grade12'}];

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor={theme.palette.secondary.main}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="50vh" p={4} boxShadow={3} bgcolor="white" borderRadius={2}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="User Name"
              variant="outlined"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              color="primary"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="room-select-label">Select Room</InputLabel>
            <Select
              labelId="room-select-label"
              id="room-select"
              value={room}
              label="Select Room"
              onChange={(e) => setRoom(e.target.value)}
              color="primary"
            >
             {availableRooms.map((room) => (
                <MenuItem key={room.group_id} value={room.group_id}>
                  {room.group_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" color="primary" onClick={handleCreateRoom} fullWidth>
            Create Room
          </Button>
          
          <Box mt={2} />

          <Button variant="contained" color="primary" onClick={handleJoin} fullWidth>
            Join
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
