// Create a theme with red and white styling
import { red } from '@mui/material/colors';
import {  createTheme } from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: '#2f53eb',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

  export default theme;