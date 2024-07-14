import React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

const ChatSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Chat Rooms</Typography>
        <Button variant="contained" color="primary" sx={{ width: '100%', mt: 1 }}>
          Create Chat Room
        </Button>
        <Button variant="contained" color="primary" sx={{ width: '100%', mt: 1 }}>
          Join Chat Room
        </Button>
      </Box>
      <List>
        <ListItem button>
          <ListItemText primary="Room 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Room 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Room 3" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ChatSidebar;
