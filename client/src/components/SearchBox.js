import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SearchBox = ({ onChange }) => {
  return (
    <Box p={2}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={(e) => onChange(e.target.value)}
        InputLabelProps={{
          style: { color: 'white' }, // Label color
        }}
        InputProps={{
          style: { color: 'white' }, // Text color
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px', // Rounded corners
            '& fieldset': {
              borderColor: 'white', // Default border color
            },
            '&:hover fieldset': {
              borderColor: 'white', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Border color when focused
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBox;
