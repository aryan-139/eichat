import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import theme from './utils/Theme';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './context/SocketContext';

const App = () => {
  const socket = React.useContext(SocketContext);
  const [userName, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [availableRooms, setAvailableRooms] = useState([
    { group_id: 'gid12345', group_name: 'Mathematics Grade1' },
    { group_id: 'gid12346', group_name: 'Mathematics Grade2' },
    { group_id: 'gid12347', group_name: 'Mathematics Grade3' },
    { group_id: 'gid12348', group_name: 'Mathematics Grade4' },
    { group_id: 'gid12349', group_name: 'Mathematics Grade5' },
  ]);

  const handleJoin = () => {
    console.log('Joining room:', room, 'with userName:', userName);
    if (room !== '' && userName !== '') {
      socket.emit('join_room', { userName, room });
    }
    // Redirect to /chat
    navigate('/chat', { state: { userName, room } });
  };

  const handleCreateRoom = () => {
    console.log('Opening Create Room modal');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing Create Room modal');
    setIsModalOpen(false);
  };

  // Submit new room data
  const handleCreateRoomSubmit = () => {
    console.log('Creating new room:', newRoom, 'with description:', roomDescription);
    const newRoomData = { group_id: newRoom, group_name: newRoom };
    setAvailableRooms([...availableRooms, newRoomData]); // Update availableRooms state with new room
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: theme.palette.secondary.main }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50vh', p: 4, boxShadow: 3, bgcolor: 'white', borderRadius: 2 }}>
          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <TextField label="User Name" variant="outlined" value={userName} onChange={(e) => setUsername(e.target.value)} color="primary" />
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <TextField label="Select Room" variant="outlined" value={room} onChange={(e) => setRoom(e.target.value)} color="primary" />
            {/* <Select labelId="room-select-label" id="room-select" value={room} label="Select Room" onChange={(e) => setRoom(e.target.value)} color="primary">
              {availableRooms.map((room) => (
                <MenuItem key={room.group_id} value={room.group_id}>{room.group_name}</MenuItem>
              ))}
            </Select> */}
          </FormControl>

          <Button variant="outlined" color="primary" onClick={handleCreateRoom} fullWidth sx={{ mb: 2 }}>Create Room</Button>

          <Button variant="contained" color="primary" onClick={handleJoin} fullWidth>Join</Button>

          {/* Modal for Create Room */}
          <Dialog open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle>Create a New Room</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="dense" label="Room Name" type="text" fullWidth variant="outlined" onChange={(e) => setNewRoom(e.target.value)} />
              <TextField margin="dense" label="Description" type="text" fullWidth variant="outlined" onChange={(e) => setRoomDescription(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">Cancel</Button>
              <Button onClick={handleCreateRoomSubmit} color="primary">Create</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
