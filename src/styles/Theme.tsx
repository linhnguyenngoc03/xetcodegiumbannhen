import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      // main: '#feAFA2',
      main: "#FF9B9B"
      // main: '#F6F9FC', 
    },
    secondary: {
      main: "rgb(25, 118, 210)"
    }
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

export default theme;
