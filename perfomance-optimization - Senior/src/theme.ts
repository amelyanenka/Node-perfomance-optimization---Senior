import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          marginBottom: 24,
        },
      },
    },
  },
});
