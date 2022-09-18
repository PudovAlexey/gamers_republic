import Checkbox from '@mui/material/Checkbox';
import withStyles from '@mui/material/styles';
import { createTheme, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }
  
  export const theme = createTheme({
    status: {
      danger: orange[500],
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            width: '100%',
            height: '50px'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            top: '60px'
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: 'fit-content !important',
            justifyContent: 'right',
            paddingRight: '5px',
            paddingLeft: '5px'
          },

        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '2px 2px',
            minWidth: 'fit-content'
          }
        }
      }
    }
  });