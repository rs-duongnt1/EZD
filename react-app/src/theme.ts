import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b49df',
    },
  },
  typography: {
    allVariants: {
      color: '#404040',
    },
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol'`,
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
    MuiPopper: {
      styleOverrides: {
        root: {
          zIndex: 1000,
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          position: 'inherit'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {},
    },
  },
});

export default theme;
