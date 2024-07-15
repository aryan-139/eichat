import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import theme from './utils/Theme';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './context/SocketContext';
import { validateUID } from './utils/landing_page_utils/userChecks';
import { validateRoom } from './utils/landing_page_utils/groupChecks';
import CreateRoomModal from './components/CreateRoomModal';

const App = () => {
  const socket = React.useContext(SocketContext);
  const [userName, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const handleJoin = () => {
    let resUID=validateUID(userName);
    let resRoom=validateRoom(room);
    if(resUID===false){alert('Invalid UID');}else if(resRoom===false){alert('Invalid Room');}
    else{
      console.log('Joining room:', room, 'with userName:', userName);
    if (room !== '' && userName !== '') {
      socket.emit('join_room', { userName, room });
    }
    navigate('/chat', { state: { userName, room } });
    }
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
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: theme.palette.secondary.main }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50vh', p: 4, boxShadow: 3, bgcolor: 'white', borderRadius: 2 }}>
          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <TextField label="Enter User ID (sample format: uid12345)" variant="outlined" value={userName} onChange={(e) => setUsername(e.target.value)} color="primary" />
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <TextField label="Enter Room ID (sample format: gid12345)" variant="outlined" value={room} onChange={(e) => setRoom(e.target.value)} color="primary" />
          </FormControl>

          <Button variant="outlined" color="primary" onClick={handleCreateRoom} fullWidth sx={{ mb: 2 }}>Create Room</Button>
          <Button variant="contained" color="primary" onClick={handleJoin} fullWidth>Join</Button>
          <CreateRoomModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleCreateRoomSubmit={handleCreateRoomSubmit} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
