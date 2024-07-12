// Create a theme with red and white styling
import { red } from '@mui/material/colors';
import {  createTheme } from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

  export default theme;