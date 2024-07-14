import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField, Button, Modal, Fade } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { SocketContext } from '../context/SocketContext';

const drawerWidth = 420;

// const recentChats = [
//   {
//     username: 'John Doe',
//     message: 'Hello',
//     time: '12:00',
//     uid: '1234',
//   }
// ];

const ChatDrawer = ({username, roomUsers}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentChat, setCurrentChat] = React.useState(null);
  const [activeUsers, setActiveUsers] = React.useState(roomUsers);
  const[recentChats, setRecentChats] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const socket = React.useContext(SocketContext); 
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChats = recentChats.filter((chat) =>
  chat.username && chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActiveUsers = () => {
    console.log('Active Users:', roomUsers);
    setActiveUsers(roomUsers);
    setOpenModal(true);
  };

  React.useEffect(() => {
    const fetchRecentChats=()=>{
      socket.emit('get_recent_chats', {uid: username});
    }
    fetchRecentChats();
    socket.on('receive_recent_chats',(chats)=>{
      console.log(chats);
      //transform the chats to the format of recentChats
      const to_recent_chats_format = chats.map((chat) => ({
        username: chat.to_user,
        message: chat.message,
        time: chat.sent_time,
        uid: chat.from_user,
      }));
      setRecentChats(to_recent_chats_format);
      console.log(to_recent_chats_format);    
    }
    );

    socket.on('send_message', fetchRecentChats);
    socket.on('receive_message', fetchRecentChats);
    return () => {
      socket.off('recent_chats');
      socket.off('send_message');
      socket.off('receive_message');
    };
  },[]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#172B4D',
            // backgroundImage: 'linear-gradient(10deg, #1d217e, #3136af)',
            color: 'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <Box sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ color: 'white' }}>
              Convo.ei
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Select a chat to start messaging
            </Typography>
          </Box>
          <ChatIcon sx={{ fontSize: 100, color: 'white', marginLeft: 'auto' }} />
        </Box>
        <List>
          <Box sx={{ padding: '1rem' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                style: { backgroundColor: 'white', borderRadius: '8px', marginTop: '0.5rem' },
              }}
            />
          </Box>
          {filteredChats.map((chat) => (
            <ListItem
              onClick={() => setCurrentChat(chat)}
              key={chat.uid}
              alignItems="flex-start"
              sx={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#3A475F',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={chat.username} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {chat.username}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: 'inline', color: 'white' }}
                    >
                      {chat.message}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: 'inline', float: 'right', color: 'white' }}
                    >
                      {chat.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        {/* Add buttons here */}
        <Box sx={{ position: 'absolute', bottom: '1rem', width: '100%' }}>
        <Button variant="contained" fullWidth sx={{ backgroundColor: '#172B4D', color: 'white', '&:hover': { backgroundColor: '#0e1d33' } }}>
            Create Group
          </Button>
        <Button variant="contained" fullWidth sx={{ backgroundColor: '#172B4D', color: 'white', '&:hover': { backgroundColor: '#0e1d33' } }}>
            Join Group
          </Button>
          <Button variant="contained" onClick={getActiveUsers} fullWidth sx={{backgroundColor: '#172B4D', color: 'white', '&:hover': { backgroundColor: '#0e1d33' } }}>
            Active Users
          </Button>
        </Box>
      </Drawer>








      {/* Modal for Active Users */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="active-users-modal"
        aria-describedby="modal-displaying-active-users"
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            width: '80vw',
            maxWidth: '400px',
          }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Active Users</Typography>
            <List>
              {roomUsers.map((user, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt={user.userName} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText primary={user.userName} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ChatDrawer;
