import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchBox from './SearchBox';



const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  }),
);


const ChatDrawer = ({roomUsers}) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (term) => {
      setSearchTerm(term);
    };
  
    const filteredUsers = roomUsers.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            position: 'fixed',
            boxSizing: 'border-box',
            marginTop: '4.5%',
            backgroundColor: '#e0544e',
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
       
        <List sx={{ color: 'white' }}>
          {/**Dashboard ListItems */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" sx={{ '&:hover': { backgroundColor: '#702a27' } }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: 'inherit' }} />
            </ListItemButton>
            
          </ListItem>
            <SearchBox onChange={handleSearchChange}/>
            <Typography variant="h6" sx={{ color: 'white', marginLeft: '1rem' }}>Group Partcipants</Typography>
            {filteredUsers.map((user) => (
                <ListItem disablePadding>
                <ListItemButton sx={{ '&:hover': { backgroundColor: '#702a27' }, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* <ListItemAvatar>
                    <Avatar
                      src={user.profilePictureUrl} // Assuming the user object has a profilePictureUrl property
                      alt={user.userName}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar> */}
                  <ListItemText primary={user.userName} sx={{ color: 'white' }} />
                </ListItemButton>
              </ListItem>
            ))}
        
        </List>
      </Drawer>
    </Box>
  );
};

export default ChatDrawer;