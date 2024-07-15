import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axiosApi from '../utils/AxiosConfig';
import { validateUID, validateFirstName, validateLastName, validatePhoneNumber } from '../utils/landing_page_utils/userChecks';

const CreateUserModal = ({ isModalOpen, handleCloseModal, handleUserCreatedSubmit }) => {
  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  //handle submission of new user data
  const handleSubmit = () => {
    let resUID=validateUID(userID);
    let resFirstName=validateFirstName(firstName);
    let resLastName=validateLastName(lastName);
    let resPhoneNumber=validatePhoneNumber(phoneNumber);
    if((resUID===false)||(resFirstName===false)||(resLastName===false)||(resPhoneNumber===false)){alert('Invalid User ID(UID must be like uid12345)');}
    else{
    //send to the api     
    const newUserData = {
        user_id: userID,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        };
        axiosApi.post('/user/add_user', newUserData);
        alert('User Created');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setUserID('');
        handleUserCreatedSubmit();                
  }}
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle>Create a New Room</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="UserID (sample: uid12345)" type="text" fullWidth variant="outlined" value={userID} onChange={(e) => setUserID(e.target.value)} />
        <TextField margin="dense" label="First Name" type="text" fullWidth variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField margin="dense" label="Last Name" type="text" fullWidth variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField margin="dense" label="Phone Number (must be 10 digits)" type="text" fullWidth variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;
