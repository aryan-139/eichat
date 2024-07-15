import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { validateRoom } from '../utils/landing_page_utils/groupChecks';

const CreateRoomModal = ({ isModalOpen, handleCloseModal, handleCreateRoomSubmit }) => {
  const [newRoomID, setNewRoomID] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const handleSubmit = () => {
    let res=validateRoom(newRoomID);
    if(res===false){alert('Invalid Room ID');}
    else{
    handleCreateRoomSubmit(newRoomID, roomDescription);
    //send to the api
    const newRoomData={
        group_id: newRoomID,
        group_name: roomName,
        description: roomDescription,
        };
    console.log(newRoomData);
    }
    setNewRoomID('');
    setRoomDescription('');
    setRoomName('');
    }
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle>Create a New Room</DialogTitle>
      <DialogContent>
      <TextField margin="dense" label="Room Name" type="text" fullWidth variant="outlined" value={roomName} onChange={(e) => setRoomName(e.target.value)} />         
        <TextField autoFocus margin="dense" label="RoomID (sample: gid12345)" type="text" fullWidth variant="outlined" value={newRoomID} onChange={(e) => setNewRoomID(e.target.value)} />
        <TextField margin="dense" label="Description" type="text" fullWidth variant="outlined" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
