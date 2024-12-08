import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DA291C',
      light: '#E35D52',
      dark: '#B71C1C',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFE14D',
      dark: '#C7A600',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
