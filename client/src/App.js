import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import theme from './utils/Theme';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './context/SocketContext';
import { validateUID } from './utils/landing_page_utils/userChecks';
import { validateRoom } from './utils/landing_page_utils/groupChecks';
import CreateRoomModal from './components/CreateRoomModal';
import CreateUserModal from './components/CreateUserModal';
import { checkIfUserExists } from './api/userApi';
import { checkIfGroupExists } from './api/groupApi';
import chat from './assets/chat.jpg';

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
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#2f53eb' }}>
        
       {/* Image Box */}
       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120rem', p: 4, boxShadow: 1, bgcolor: 'white', borderRadius: 2 ,m:5 }}>
          <img src={chat} alt="Description of the image" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
        </Box>
        <Box sx={{ display: 'flex', marginLeft:'20px',flexDirection: 'column', width: '70rem', p: 4, boxShadow: 1, bgcolor: 'white', borderRadius: 3.5 }}>

          <FormControl fullWidth margin="normal" sx={{ mb: 2, mt:"18rem" }}>
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
