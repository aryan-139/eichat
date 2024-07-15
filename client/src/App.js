import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import theme from './utils/Theme';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './context/SocketContext';
import { validateUID } from './utils/landing_page_utils/userChecks';
import { validateRoom } from './utils/landing_page_utils/groupChecks';
import CreateRoomModal from './components/CreateRoomModal';
import CreateUserModal from './components/CreateUserModal';
import { checkIfUserExists } from './api/userApi';
import { checkIfGroupExists } from './api/groupApi';

const App = () => {
  const socket = React.useContext(SocketContext);
  const [userName, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const navigate = useNavigate();

  //login and group verification
  const handleJoin = async () => {
    if (!validateUID(userName)) {
      alert('Invalid UID');
      return;
    }
    if (!validateRoom(room)) {
      alert('Invalid Room');
      return;
    }
    const userExists = await checkIfUserExists(userName);
    if (!userExists) {
      alert('User does not exist');
      return;
    }
    const groupExists = await checkIfGroupExists(room);
    if (!groupExists) {
      alert('Group does not exist');
      return;
    }
    console.log('Joining room:', room, 'with userName:', userName);
    if (room !== '' && userName !== '') {
      socket.emit('join_room', { userName, room });
      navigate('/chat', { state: { userName, room } });
    }
  };
  const handleCreateUser = () => {
    console.log('Creating new user');
    setIsUserModalOpen(true);
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

  const handleUserCreatedSubmit = () => {
    setIsUserModalOpen(false);
  }

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
          <Button variant="outlined" color="primary" onClick={handleCreateUser} sx={{mb:2}} fullWidth>Create New User</Button>
          <Button variant="contained" color="primary" onClick={handleJoin} fullWidth>Join</Button>
          <CreateRoomModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleCreateRoomSubmit={handleCreateRoomSubmit} />
          <CreateUserModal isModalOpen={isUserModalOpen} handleCloseModal={()=>setIsUserModalOpen(false)} handleUserCreatedSubmit={handleUserCreatedSubmit} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
