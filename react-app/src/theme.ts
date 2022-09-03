import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#666',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          textUnderlineOffset: '3px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {},
    },
  },
});

export default theme;
