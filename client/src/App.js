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
              <MenuItem value="room1">Room 1</MenuItem>
              <MenuItem value="room2">Room 2</MenuItem>
              <MenuItem value="room3">Room 3</MenuItem>
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
